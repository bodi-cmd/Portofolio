function getBytes(instruction, from, downto) {
  let instr = instruction;
  let maskLen = from - downto + 1;
  let mask = 0;
  for (let i = 0; i < maskLen; i++) {
    mask <<= 1;
    mask += 1;
  }
  mask <<= downto;
  instr &= mask;
  instr >>= downto;
  return instr;
}

function bitAt(instruction, index) {
  let mask = 1;
  mask <<= index;
  let result = instruction & mask;
  result >>= index;
  return result;
}

function decToBin(instruction) {
  return instruction;
}

function intTo16bits(integer) {
  let result = "";
  let mask = 0b1000000000000000;
  for (let i = 0; i < 16; i++) {
    result += (integer & mask) >> (15 - i);
    mask >>= 1;
  }
  return result;
}

function intToBin(integer) {
  let result = "";
  while (integer) {
    result = ("" + integer) & (1 + result);
    integer >>= 1;
  }
  return result;
}

function intToBinInstructionWithUnderlines(integer) {
  let str =
    "" +
    bitAt(integer, 15) +
    bitAt(integer, 14) +
    bitAt(integer, 13) +
    "_" +
    bitAt(integer, 12) +
    bitAt(integer, 11) +
    bitAt(integer, 10) +
    "_" +
    bitAt(integer, 9) +
    bitAt(integer, 8) +
    bitAt(integer, 7) +
    "_";
  if (getBytes(integer, 15, 13) == 0) {
    str =
      str +
      bitAt(integer, 6) +
      bitAt(integer, 5) +
      bitAt(integer, 4) +
      "_" +
      bitAt(integer, 3) +
      "_" +
      bitAt(integer, 2) +
      bitAt(integer, 1) +
      bitAt(integer, 0);
  } else {
    str =
      str +
      bitAt(integer, 6) +
      bitAt(integer, 5) +
      bitAt(integer, 4) +
      bitAt(integer, 3) +
      bitAt(integer, 2) +
      bitAt(integer, 1) +
      bitAt(integer, 0);
  }

  return str;
}

function intToASM(integer) {
  const instruction = intToBinInstructionWithUnderlines(integer);
  const instrParts = instruction.split("_");
  //console.log(instrParts);

  let rs, rt, rd;

  rs = parseInt(instrParts[1], 2);
  rt = parseInt(instrParts[2], 2);


  const func = ["add", "sub", "sll", "srl", "and", "or", "mul", "xor"];
  const OPCODE = ["typeR", "addi","lw","sw","beq","bgz","andi"];

  //check the opcode
  if (instrParts[0] == "000") {
    //is type R
    rd = parseInt(instrParts[3], 2);
    let sa = parseInt(instrParts[4], 2);
    let funcStr = func[parseInt(instrParts[5], 2)];
    
    return `${funcStr} $${rd}, $${rs}, $${rt}`;
  }
  else if(instrParts[0] != "111"){
    //not jump, so it's type I
    let funcStr = OPCODE[parseInt(instrParts[0], 2)];
    let imm = parseInt(instrParts[3], 2);
    if(funcStr != "andi" && imm > 63){
        imm -= 128;
    }
    if(instrParts[0] == "101")
      return `${funcStr} $${rs}, ${imm}`
    return `${funcStr} $${rt}, $${rs}, ${imm}`
  }
  else{
    //it's J Type
    return `jmp ${parseInt(instrParts[1]+instrParts[2]+instrParts[3], 2)}`
  }
}

function toSignedInt(integer) {
  if (integer >= 0x8000) {
    return integer - 0xffff - 1;
  }
  return integer;
}

function intToHex(integer) {
  let result = "0x";
  let mask = 0xf000;
  for (let i = 0; i < 4; i++) {
    let digit = (integer & mask) >> (12 - i * 4);
    //console.log(digit);
    mask >>= 4;
    if (digit < 10) {
      result += digit;
    } else {
      switch (digit) {
        case 10:
          result += "A";
          break;
        case 11:
          result += "B";
          break;
        case 12:
          result += "C";
          break;
        case 13:
          result += "D";
          break;
        case 14:
          result += "E";
          break;
        case 15:
          result += "F";
          break;

        default:
          break;
      }
    }
  }
  return result;
}
