class Memory{
    
    RAM = [];
    writeBack = 0;
    predictedWriteBack = -1;
    constructor(IF, MC, ID,ALU, notifier){
        this.notify = notifier;
        this.IF = IF;
        this.MC = MC;
        this.ID = ID;
        this.ALU = ALU;
        this.writeBack = this.MC.mem2reg ? this.RAM[this.ALU.alures] : this.ALU.alures;
        this.notify(this);
    }

    computeData(){
        if(this.MC.memwr){
            this.RAM[this.ALU.alures] = this.ID.rd2;
        }

        this.writeBack = this.MC.mem2reg ? this.RAM[this.ALU.alures] : this.ALU.alures;

        if(this.MC.regwr){
            this.ID.reg[this.ID.wa] = this.writeBack & 0xFFFF;
        }

        
    }

    predictNextData(){
        this.predictedWriteBack = this.MC.mem2reg ? this.RAM[this.ALU.alures] : this.ALU.alures;
    }

    clock(){
        this.computeData();
        this.notify(this);
    }

    reset(){
        this.RAM = [];
        this.predictedWriteBack = -1;
        this.writeBack = this.MC.mem2reg ? this.RAM[this.ALU.alures] : this.ALU.alures;
        this.notify(this);
    }
}