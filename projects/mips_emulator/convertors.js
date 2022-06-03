function getBytes(instruction,from, downto){
    var instr = instruction;
    var maskLen = from-downto+1;
    var mask = 0;
    for(var i=0;i<maskLen;i++){
        mask <<=1;
        mask += 1;
    }
    mask <<= downto;
    instr &= mask;
    instr >>= downto;
    return instr;
}

function bitAt(instruction, index){
    var mask = 1;
    mask <<= index;
    var result = instruction & mask;
    result >>= index;
    return result;
}

function decToBin(instruction){
    return instruction;
}

function intTo16bits(integer){
    var result = "";
    var mask = 0b1000000000000000;
    for(let i=0;i<16;i++){
        result += (integer & mask) >> (15-i);
        mask>>=1;
    }
    return result;
}

function intToBin(integer){
    var result ="";
    while(integer){
        result = "" + integer & 1 + result;
        integer>>=1;
    }
    return result;
}

function intToBinInstructionWithUnderlines(integer){
    var str = "" 
    + bitAt(integer,15)
    + bitAt(integer,14)
    + bitAt(integer,13)
    +"_"
    + bitAt(integer,12)
    + bitAt(integer,11)
    + bitAt(integer,10)
    + "_"
    + bitAt(integer,9)
    + bitAt(integer,8)
    + bitAt(integer,7)
    + "_";
    if(getBytes(integer,15,13) == 0){
        str = str
        + bitAt(integer,6)
        + bitAt(integer,5)
        + bitAt(integer,4)
        + "_"
        + bitAt(integer,3)
        + "_"
        + bitAt(integer,2)
        + bitAt(integer,1)
        + bitAt(integer,0)
    }else{
        str = str
        + bitAt(integer,6)
        + bitAt(integer,5)
        + bitAt(integer,4)
        + bitAt(integer,3)
        + bitAt(integer,2)
        + bitAt(integer,1)
        + bitAt(integer,0)
    }
    
    return str;
}

function toSignedInt(integer){
    if(integer >= 0x8000){
        return integer - 0xFFFF - 1;
    }
    return integer
}

function intToHex(integer){
    var result = "0x";
    var mask = 0xF000;
    for(let i=0;i<4;i++){
        var digit = (integer & mask) >> (12-i*4);
        //console.log(digit);
        mask >>= 4;
        if(digit < 10){
            result += digit;
        }
        else{
            switch (digit) {
            case 10:
            result+="A";
            break;
            case 11:
            result+="B";
            break;
            case 12:
            result+="C";
            break;
            case 13:
            result+="D";
            break;
            case 14:
            result+="E";
            break;
            case 15:
            result+="F";
            break;
            
                default:
                    break;
            }
        }
    }
    return result;
}