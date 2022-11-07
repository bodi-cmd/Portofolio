class InstructionFetch{

    constructor(notifier){
        this.PC = 0;
        this.ROM = [
            0b000_000_000_000_0_111,
            0b0000010010010111,
            0b0000100100100111,
            0b0010000001111111,
            0b0010100100001000,
            0b0010100101111111,
            0b0010000000000010,
            0b0110100000000000,
            0b1010100001111101,
            0b0000100100100111,
            0b0000000000000111,
            0b0010100100001000,
            0b0010100101111111,
            0b0100100010000000,
            0b0000010000000000,
            0b1010100001111101,
            0b0000000000001011,
            0b0000000000000011,
            0b1110000000000000,
        ];
        this.jump = 0;
        this.PC_Src = 0;
        this.jumpAddres = 0;
        this.notify = notifier;
        this.currentInstruction = this.ROM[0];
        this.notify(this);
    }

    clock(){
        if(this.jump){
            this.PC = this.jumpAddres;
        }
        else{
            if(this.PC_Src){
                this.PC = this.branchAdress;
            }
            else{
                this.PC++;
            }
        }
        this.currentInstruction = this.ROM[this.PC];
        this.notify(this);
    }
    reset(){
        this.PC = 0;
        this.jump = 0;
        this.PC_Src = 0;
        this.jumpAddres = 0;
        this.currentInstruction = this.ROM[0];
        this.notify(this);
    }
}