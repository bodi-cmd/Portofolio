class MainControl{
    signals = 0;
    IF = null;
    constructor(IF,notifier){
        this.IF = IF;
        this.computeSignals(this.IF.currentInstruction);
        this.notify = notifier;
        this.notify(this);
    }

    computeSignals(instruction){
        this.opcode = getBytes(instruction,15,13);
        switch (getBytes(instruction,15,13)) {
            case 0b000:
                this.signals = 0b01100000000;
                break;
            case 0b001:
                this.signals = 0b00111010000;
            break;
            case 0b010:
                this.signals = 0b00111010001;
            break;
            case 0b011:
                this.signals = 0b00011010010;
            break;
            case 0b100:
                this.signals = 0b00010101000;
            break;
            case 0b101:
                this.signals = 0b10010100000;
            break;
            case 0b110:
                this.signals = 0b00101110000;
            break;
            case 0b111:
                this.signals = 0b00000000100;
            break;                                                                              
            default:
                break;
        }
        
        this.branchgz = bitAt(this.signals,10);
        this.regdst = bitAt(this.signals,9);
        this.regwr = bitAt(this.signals,8);
        this.extop = bitAt(this.signals,7);
        this.alusrc = bitAt(this.signals,6);
        this.aluop = getBytes(this.signals,5,4);
        this.branch = bitAt(this.signals,3);
        this.jump = bitAt(this.signals,2);
        this.memwr = bitAt(this.signals,1);
        this.mem2reg = bitAt(this.signals,0);

        this.IF.jump = this.jump;
        this.IF.jumpAdress = getBytes(this.IF.instruction,12,0);
    }

    clock(){
        this.computeSignals(this.IF.currentInstruction);
        this.notify(this);
    }

    reset(){
        this.computeSignals(this.IF.currentInstruction);
        this.notify(this);
    }

}