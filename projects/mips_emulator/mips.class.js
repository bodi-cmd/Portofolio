class MIPS{
    var instructionMode = intToBinInstructionWithUnderlines;
   
    const IF = new InstructionFetch((IF) =>{
        $("#pc-field").text(IF.PC);
        $('#pc-signal').text(IF.PC);
        $('#instr-field').text(intToHex(IF.currentInstruction));
        printInstructions(IF);
        $('#ja').text(intToHex(getBytes(IF.currentInstruction,12,0)));

    });


    function printInstructions(IF){
        $('#instruction-box').empty();
        IF.ROM.forEach((line, index)=>{
            const selected = (index == IF.PC) ? ' selected-line' : '';
            $('#instruction-box').append(`<div class="ins-line${selected}">${instructionMode(line)}</div>`);
        });
    }

    const MC = new MainControl(IF,(MC)=>{
        $(".bulb").removeClass("on");
        if(MC.regdst) $('#bulb-regdst').addClass("on");
        if(MC.jump) $('#bulb-jump').addClass("on");
        if(MC.regwr) $('#bulb-regwr').addClass("on");
        if(MC.mem2reg) $('#bulb-mem2reg').addClass("on");
        if(MC.memwr) $('#bulb-memwr').addClass("on");
        if(MC.branchgz) $('#bulb-branchgz').addClass("on");
        if(MC.branch) $('#bulb-branch').addClass("on");
        if(MC.aluop) $('#bulb-aluop').addClass("on");
        if(MC.alusrc) $('#bulb-alusrc').addClass("on");
        if(MC.extop) $('#bulb-extop').addClass("on");
        
        
    });

    const ID = new InstructionDecoder(IF,MC,(ID)=>{
        $("#ra1").text(ID.ra1);
        $("#ra2").text(ID.ra2);
        $("#rd1").text(ID.rd1);
        $("#rd2").text(ID.rd2);
        $("#extimm").text(toSignedInt(ID.extimm));
        $("#imm").text(intToHex(getBytes(IF.currentInstruction,6,0)));

        ID.reg.forEach((register,index)=> {
            $(`#reg${index}`).html(`$${index}: ${toSignedInt(register)}`);
        })

        $('#bra').text(intToHex(IF.branchAdress));

    });

    const ALU = new ALUClass(IF,ID,MC,(ALU)=>{
        $('#alures').text(ALU.alures);
        $('#z-signal').text(ALU.Zero);
        $('#gz-signal').text(ALU.Gzero);
        $('#pcsrc-signal').text(IF.PC_Src);

    });

    const MEM = new Memory(IF,MC,ID,ALU,(MEM)=>{
        $('.mem-ctn').empty();
        MEM.RAM.forEach((data,index) => {
            $('.mem-ctn').append(`<div class="mem-line">${index}: ${data}</div>`);
        });
        $('#wd-signal').text(intToHex(MEM.predictedWriteBack));
    });

    MEM.predictNextData();
    MEM.notify(MEM);

    $("#clk").click(()=>{
        MEM.clock();
        IF.clock();
        MC.clock();
        ID.clock();
        ALU.clock();
        MEM.predictNextData();
        MEM.notify(MEM);
    });

    $("#hex").click(()=>{
        instructionMode = intToHex;
        printInstructions(IF);
        $(".menu-btn").removeClass("selected");
        $("#hex").addClass("selected");
    });

    $("#bin").click(()=>{
        instructionMode = intToBinInstructionWithUnderlines;
        printInstructions(IF);
        $(".menu-btn").removeClass("selected");
        $("#bin").addClass("selected");
    });

}
