class InstructionDecoder{

    reg = [0,0,0,0,0,0,0,0];
    IF = null;
    MC = null;
    wd = 0;

    constructor(IF, MC, notifier){
        this.notify = notifier;
        this.IF = IF;
        this.MC = MC;
        this.ra1 = getBytes(IF.currentInstruction,12,10);
        this.ra2 = getBytes(IF.currentInstruction,9,7);

        this.rd1 = this.reg[this.ra1];
        this.rd2 = this.reg[this.ra2];

        this.wa = this.MC.regdst ? getBytes(IF.currentInstruction,6,4) : getBytes(IF.currentInstruction,9,7);

        this.extimm = this.MC.extop ? 
            (bitAt(IF.currentInstruction,6) ? 0b1111111111 << 6 + getBytes(IF.currentInstruction,5,0) : getBytes(IF.currentInstruction,5,0))
            :
            getBytes(IF.currentInstruction,6,0);

        this.IF.branchAdress = (this.IF.PC + this.extimm) & 0xFFFF;

        this.notify(this);
    }

    clock(){
        this.ra1 = getBytes(this.IF.currentInstruction,12,10);
        this.ra2 = getBytes(this.IF.currentInstruction,9,7);
        this.rd1 = this.reg[this.ra1];
        this.rd2 = this.reg[this.ra2];

        this.wa = this.MC.regdst ? getBytes(this.IF.currentInstruction,6,4) : getBytes(this.IF.currentInstruction,9,7);
        //console.log("-------wa: "+this.wa + " bytes: "+getBytes(this.IF.currentInstruction,9,7)+ " regdst: "+this.MC.regdst);

        this.extimm = this.MC.extop ? 
            (bitAt(this.IF.currentInstruction,6) ? 0b1111111111 << 6 | getBytes(this.IF.currentInstruction,5,0) : getBytes(this.IF.currentInstruction,5,0))
            :
            getBytes(this.IF.currentInstruction,6,0);
        this.IF.branchAdress = (this.IF.PC + this.extimm) & 0xFFFF;
        this.notify(this);
    }

    reset(){
        this.wd = 0;
        this.reg = [0,0,0,0,0,0,0,0];
        this.ra1 = getBytes(this.IF.currentInstruction,12,10);
        this.ra2 = getBytes(this.IF.currentInstruction,9,7);
        this.rd1 = this.reg[this.ra1];
        this.rd2 = this.reg[this.ra2];

        this.wa = this.MC.regdst ? getBytes(this.IF.currentInstruction,6,4) : getBytes(this.IF.currentInstruction,9,7);
        //console.log("-------wa: "+this.wa + " bytes: "+getBytes(this.IF.currentInstruction,9,7)+ " regdst: "+this.MC.regdst);

        this.extimm = this.MC.extop ? 
            (bitAt(this.IF.currentInstruction,6) ? 0b1111111111 << 6 | getBytes(this.IF.currentInstruction,5,0) : getBytes(this.IF.currentInstruction,5,0))
            :
            getBytes(this.IF.currentInstruction,6,0);
        this.IF.branchAdress = (this.IF.PC + this.extimm) & 0xFFFF;
        this.notify(this);
    }
}