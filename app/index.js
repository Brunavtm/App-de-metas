const { select, input, checkbox } = require('@inquirer/prompts');

let meta1 = {
    value: "Tomar 3L de água por dia.",
    checked: false,
}

let metas = [meta1]

const cadastrarMeta = async () => {
    const meta = await input({message: "Informe a sua meta:"})

    if(meta.length == 0){
        console.log("A meta não foi digitada.")
        return
    }

    metas.push(
        {value: meta, checked: false}
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as seta para se movimentar, espaço para marcar/desmarcar e enter para selecionar.",
        choices: [...metas],
        instructions: false,
    })

    if(respostas.length == 0 ){
        console.log("Nenhuma meta foi selecionada.")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Metas atualizadas.")
}

const iniciar = async () => {
    
    while(true){
        
        const opcao = await select({
            message: "Escolha no Menu:   (use as setas para navegar e enter para escolher)",
            choices: [
            {
                name: "Cadastrar meta",
                value: 'cadastrar'
            },
            {
                name: "Listar metas",
                value: "listar"
            },
            {
                name: "Sair",
                value: "sair"
            }
        ],
            

        })

        switch(opcao){
            case 'cadastrar':
                await cadastrarMeta()
                console.log(metas)
                break
            case 'listar':
                await listarMetas()
                break
            case 'sair':
                console.log("Até logo!")
                return
        }
    }
};

iniciar();