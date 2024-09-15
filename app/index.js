const { select, input, checkbox } = require('@inquirer/prompts');

let mensagem = "Bem-vindo ao App de Metas!"

let meta1 = {
    value: "Tomar 3L de água por dia.",
    checked: false,
}

let metas = [meta1]

const cadastrarMeta = async () => {
    const meta = await input({message: "Informe a sua meta:"})

    if(meta.length == 0){
        mensagem = "A meta não foi digitada."
        return
    }

    metas.push(
        {value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as seta para se movimentar, espaço para marcar/desmarcar e enter para selecionar.",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0 ){
        mensagem = "Nenhuma meta foi selecionada."
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem ="Metas atualizadas."
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = 'Não existem metas realizadas :('
        return
    }

    await select({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0){
        mensagem = 'Não existem metas abertas! :)'
        return
    }

    await select({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    } )
    const metasDeletar = await checkbox({
        message: "Selecione a meta para deletar.",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(metasDeletar == 0){
        mensagem = "Nenhum item para deletar."
        return
    }

    metasDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ''){
        console.log('')
        console.log(mensagem)
        console.log('')
        mensagem = ''
    }


}

const iniciar = async () => {
    
    while(true){
        mostrarMensagem()

        const opcao = await select({
            message: "Escolha no Menu:",
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
                name: "Metas Abertas",
                value: "abertas"
            },
            {
                name: "Metas Realizadas",
                value: "realizadas"
            },
            {
                name: "Deletar metas",
                value: "deletar"
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
                break
            case 'listar':
                await listarMetas()
                break
            case 'realizadas':
                await metasRealizadas()
                break
            case 'abertas':
                await metasAbertas()
                break
            case 'deletar':
                await deletarMetas()
                break
            case 'sair':
                console.log("Até logo!")
                return
        }
    }
};

iniciar();