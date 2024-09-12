const { select } = require('@inquirer/prompts');

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
        ]

            

        })

        switch(opcao){
            case 'cadastrar':
                console.log("Cadastrar meta:")
                break
            case 'listar':
                console.log("Listar meta:")
                break
            case 'sair':
                console.log("Até logo!")
                return
        }
    }
};

iniciar();