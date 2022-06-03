class ALUClass{

    A = 0;
    B = 0;
    IF = null;
    MC = null;
    ID = null;
    aluctrl = 0;
    alures = 0;
    Zero = 0;
    Gzero = 0;

    constructor(IF,ID, MC, notifier){
        this.IF = IF;
        this.MC = MC;
        this.ID = ID;
        
        this.computeData();

        this.notify = notifier;
        this.notify(this);
    }

    computeData(){
        this.A = this.ID.rd1;
        this.B = this.MC.alusrc ? this.ID.extimm : this.ID.rd2;
        switch (this.MC.aluop) {
            case 0b01:
                this.aluctrl = 0b000;
            break;
            case 0b10:
                this.aluctrl = 0b001;
            break;
            case 0b11:
                this.aluctrl = 0b010;
            break;
            case 0b00:
                switch (getBytes(this.IF.currentInstruction,2,0)) {
                    case 0b000:
                        this.aluctrl = 0b000;
                    break;
                    case 0b001:
                        this.aluctrl = 0b001;
                    break;
                    case 0b010:
                        this.aluctrl = 0b110;
                    break;
                    case 0b011:
                        this.aluctrl = 0b111;
                    break;
                    case 0b100:
                        this.aluctrl = 0b010;
                    break;
                    case 0b101:
                        this.aluctrl = 0b011;
                    break;
                    case 0b110:
                        this.aluctrl = 0b100;
                    break;
                    case 0b111:
                        this.aluctrl = 0b101;
                    break;
                    default:
                        break;
                }
            break;
            default:
                break;
        }

        switch (this.aluctrl) {
            case 0b000:
                this.alures = this.A + this.B;
            break;
            case 0b001:
                this.alures = this.A - this.B;
            break;
            case 0b010:
                this.alures = this.A & this.B;
            break;
            case 0b011:
                this.alures = this.A | this.B;
            break;
            case 0b100:
                this.alures = this.A * this.B;
            break;
            case 0b101:
                this.alures = this.A ^ this.B;
            break;
            case 0b110:
                this.alures = this.A << (bitAt(this.IF.currentInstruction,3)+1);
            break;
            case 0b111:
                this.alures = this.A >> (bitAt(this.IF.currentInstruction,3)+1);
            break;
        
            default:
                break;
        }

        this.alures &= 0xFFFF;

        this.Gzero = (this.A)&0xFFFF ? 1 : 0;
        this.Zero  = this.A == this.B ? 1 : 0;

        this.IF.PC_Src = this.MC.branchgz && this.Gzero || this.MC.branch && this.Zero;

    }

    clock(){
        this.computeData();
        this.notify(this);
    }

    reset(){
        this.computeData();
        this.notify(this);
    }
}