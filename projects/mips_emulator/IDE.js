const IDE = (textareaSelector) => {
  const textarea = document.querySelector(textareaSelector);

  let consoleMessage = `This is the console. Any problem will be printed here...`
  let outputMessage = "This is the output. The binary code of your program will pe printed here..."


  const getConsoleMessage = () => {
    return consoleMessage;
  }
  const getOutputMessage = () => {
    return outputMessage;
  }

  const parseLine = (line) => {

    const registerMapper = {
        "$0":0,
        "$1":1,
        "$2":2,
        "$3":3,
        "$4":4,
        "$5":5,
        "$6":6,
        "$7":7,
    }

    const OPCODE_Mapper = {
        "addi": 0b001_0000000000000,
        "lw": 0b010_0000000000000,
        "sw": 0b011_0000000000000,
        "beq": 0b100_0000000000000,
        "bgz": 0b101_0000000000000,
        "andi": 0b110_0000000000000,
        "jmp": 0b111_0000000000000,
        "add": 0b000_0000000000000,
        "sub": 0b000_0000000000000,
        "sll": 0b000_0000000000000,
        "srl": 0b000_0000000000000,
        "and": 0b000_0000000000000,
        "or": 0b000_0000000000000,
        "mul": 0b000_0000000000000,
        "xor": 0b000_0000000000000,
    }

    const func_Mapper = {
        "add": 0,
        "sub": 1,
        "sll": 2,
        "srl": 3,
        "and": 4,
        "or": 5,
        "mul": 6,
        "xor": 7,
    }

    const words = line
      .replaceAll(",", "")
      .split(" ")
      .filter((word) => word.length);

    let instruction = 0;

    //check first word (the function name)
    if(OPCODE_Mapper[words[0]] == undefined){
        throw Error(words[0] + " is not a funciton!")
    }

    instruction |= words[0]

    //if instruction is R type
    if(OPCODE_Mapper[words[0]] == 0){
        instruction |= func_Mapper[words[0]];
        //words[1] words[2] words[3] must be registers
        for(let i = 1; i <= 3; i++){
            if(registerMapper[words[i]] == undefined){
                throw Error(words[i] + " is not a valid register! Valid registers are " + Object.keys(registerMapper) + ".")
            }
        }
        const rs = registerMapper[words[2]] << 10;
        const rt = registerMapper[words[3]] << 7;
        const rd = registerMapper[words[1]] << 4;
        instruction |= rs | rt | rd;

        return instruction;
    }

    //if instruction is I type
    if(OPCODE_Mapper[words[0]] != 0 && OPCODE_Mapper[words[0]] != 0b111_0000000000000){
        //words[1] words[2] must be registers, but if the function is bgz, only words[1] must be register
        let numOfRegisters = 2;
        let imm;

        //if its bgz
        if(OPCODE_Mapper[words[0]] == 0b101_0000000000000){
            numOfRegisters = 1

            if(!Number.isInteger(parseInt(words[2]))){
                throw Error(words[2] + " is not a valid 7 bit Integer!");
            }
            imm = parseInt(words[2]);
        }
        else{
            if(!Number.isInteger(parseInt(words[3]))){
                throw Error(words[3] + " is not a valid 7 bit Integer!");
            }
            imm = parseInt(words[3]);
        }
        
        for(let i = 1; i <= numOfRegisters; i++){
            if(registerMapper[words[i]] == undefined){
                throw Error(words[i] + " is not a valid register! Valid registers are " + Object.keys(registerMapper).map(key=>`, ${key}`) + ".")
            }
        }

        
        const rs = numOfRegisters == 2 ? registerMapper[words[2]] << 10 : registerMapper[words[1]] << 10;
        const rt = numOfRegisters == 2 ? registerMapper[words[1]] << 7 : 0;

        //if its andi
        if(OPCODE_Mapper[words[0]] != 0b110_0000000000000){
            if(imm > 63){
                imm -= 128;
            }
        }
        imm &= 0b1111111;
        instruction |= OPCODE_Mapper[words[0]] | rs | rt | imm;
        return instruction
    }

    //if instruction is J type
    if(OPCODE_Mapper[words[0]] == 0b111_0000000000000){
        if(!Number.isInteger(parseInt(words[1])) || parseInt(words[1]) < 0){
            throw Error(words[1] + " is not a valid 12 bit positive Integer!");
        }
        imm = parseInt(words[1]);
        instruction |= OPCODE_Mapper[words[0]] | imm; 
        return instruction;
    }
    

    
  };

  const getCode = () => {
    let lines = textarea.value.split("\n");
    lines = lines.filter(line => line.length ).map((line, index)=>{
            try{
                return parseLine(line);
            }catch(e){
                consoleMessage = `Error at line ${index + 1}.\n${e}`
                outputMessage = `There is no output...\nYou have errors in your code! Check them in the console.`
                throw Error(e + "at line " + index);
            }
        });
    consoleMessage = "Compiled with 0 errors!";
    outputMessage = "";
    lines.forEach((line,index)=>{
        outputMessage += intToBinInstructionWithUnderlines(line) + `\n`;
    })
    return lines;
  };

  return { getCode, getConsoleMessage, getOutputMessage };
};
