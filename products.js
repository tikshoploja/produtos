const products = [
    {
        name: "Suporte Escova de Dentes com Esterilizador UV",
        price: 31.49,
        image: "https://down-br.img.susercontent.com/file/br-11134207-23020-sg5a34ihvxnva9.webp",
        link: "https://s.shopee.com.br/3Ax1nExpv9"
    },
    {
        name: "Descascador de Legumes e Frutas Aço Inox",
        price: 10.00,
        image: "https://down-br.img.susercontent.com/file/dad9ae9affd1fa308482a36fede2ff9c.webp",
        link: "https://s.shopee.com.br/1Von8x2jlE"
    },
    {
        name: "Limpa Tênis Spray",
        price: 21.90,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ln294i2qa7nn2f.webp",
        link: "https://s.shopee.com.br/4L8sHMGoXU"
    },
    {
        name: "Copo Térmico Stanley",
        price: 38.99,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-mc1bsqqxz3c744.webp",
        link: "https://s.shopee.com.br/1LVGg2Chpu"
    },
    {
        name: "Garrafa Térmica Wood Luxo",
        price: 49.99,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ma1okn32zojm7e.webp",
        link: "https://s.shopee.com.br/2LNniC43ge"
    },
    {
        name: "Kit 2 Mini Câmeras Wifi",
        price: 56.80,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ly58zskpi8f973.webp",
        link: "https://s.shopee.com.br/9Uqwxe2Pjd"
    },
    {
        name: "Mini Máquina de Donuts Elétrica",
        price: 34.89,
        image: "https://down-br.img.susercontent.com/file/sg-11134201-7rd3y-m6tvmu38rojfbe.webp",
        link: "https://s.shopee.com.br/Vw86LarJY"
    },
    {
        name: "Chaleira Elétrica Térmica",
        price: 53.90,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-mcgf55h49wdua6.webp",
        link: "https://s.shopee.com.br/50OXEs378q"
    },
    {
        name: "Frigideira Antiaderente 3 em 1 com Divisórias",
        price: 38.69,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ly431d2zarkn44.webp",
        link: "https://s.shopee.com.br/40W01G28Lq"
    },
    {
        name: "Kit 2 Calças Premium",
        price: 79.90,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m7vbu3elqx0416.webp",
        link: "https://s.shopee.com.br/4q55mHwbkk"
    },
    {
        name: "Aspirador De Pó Portátil",
        price: 25.99,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7qukw-lgnnrx41wbeece.webp",
        link: "https://s.shopee.com.br/5VKmW9YUs0"
    },
    {
        name: "Mop Spray Giratório",
        price: 34.70,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m8eraexb3mz5e0.webp",
        link: "https://s.shopee.com.br/qYwycMQo9"
    },
    {
        name: "Mesas de Cabeceira Retro de Luxo",
        price: 29.90,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m7i0w8b1jgkyeb.webp",
        link: "https://s.shopee.com.br/4ApOkLtZLa"
    },
    {
        name: "Tapete De Banheiro Soft",
        price: 15.98,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7qukw-lijcoe244olbe6.webp",
        link: "https://s.shopee.com.br/7V5qegSdgJ"
    },
    {
        name: "Kit 10 Limpador de Máquina de Lavar",
        price: 19.99,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lv98cwwitsix1e.webp",
        link: "https://s.shopee.com.br/6fWjarBfZt"
    },
    {
        name: "Copo Térmico Café",
        price: 36.99,
        image: "https://down-br.img.susercontent.com/file/sg-11134201-7rdxt-mc5s6ipbwzcc6a.webp",
        link: "https://s.shopee.com.br/3qCWnwwrS0"
    },
    {
        name: "Escova De Limpeza Ajustável",
        price: 69.99,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ln91fcbvnuwzbd.webp",
        link: "https://s.shopee.com.br/50OUAcX9qd"
    },
    {
        name: "Espelho Redondo com Led",
        price: 150.00,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lvn8oc7p8j5222.webp",
        link: "https://s.shopee.com.br/5L1JCel7nR"
    },
    {
        name: "Projetor 4K HD",
        price: 204.49,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lvm98b66j9zyb5.webp",
        link: "https://s.shopee.com.br/9pTdb9cc24"
    },
    {
        name: "Organizador de Maquiagem Giratório 360º",
        price: 39.90,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m415wji061xdd5.webp",
        link: "https://s.shopee.com.br/4VS70855j1"
    },
    {
        name: "Kit Livro de Colorir + Canetinhas Marca Texto",
        price: 29.99,
        image: "https://down-br.img.susercontent.com/file/sg-11134201-7rdy2-mcahjd5s3qflfe.webp",
        link: "https://s.shopee.com.br/9zn3VZ6O1B"
    },
    {
        name: "Escova Secadora 5 em 1",
        price: 67.99,
        image: "https://down-br.img.susercontent.com/file/sg-11134201-7rdy8-mc8hulngya5c53.webp",
        link: "https://s.shopee.com.br/1BBdsug4Np"
    },
    {
        name: "Garrafa Térmica Inoxidável com Tampa e Canudo",
        price: 39.98,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m27sald0uqme5e.webp",
        link: "https://s.shopee.com.br/3AwhhF8lLm"
    },
    {
        name: "Mini Rodo Esfregão",
        price: 12.89,
        image: "https://down-br.img.susercontent.com/file/sg-11134201-7rcc7-ltb8mvlocoa2d4.webp",
        link: "https://s.shopee.com.br/8UyCehVM4j"
    },
    {
        name: "Espremedor Elétrico Portátil",
        price: 65.79,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lqy7j7hfu7foe4.webp",
        link: "https://s.shopee.com.br/2B47b0mEcA"
    },
    {
        name: "Fone/Headset Bluetooth",
        price: 32.97,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lomqjeb9ouk2cc.webp",
        link: "https://s.shopee.com.br/AA6P9Ky9cv"
    },
    {
        name: "Karseell Collagen - Tratamento Capilar",
        price: 22.90,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lwlretvo5a4y41.webp",
        link: "https://s.shopee.com.br/7piUEt14af"
    },
    {
        name: "Limpador de Pincel",
        price: 29.99,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lw505j7cyhmd45.webp",
        link: "https://s.shopee.com.br/2qJgfcxyfs"
    },
    {
        name: "Escova Mágica De Limpeza",
        price: 33.27,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m527v5unmuth56.webp",
        link: "https://s.shopee.com.br/9zmqt19alu"
    },
    {
        name: "Jogo De Panelas",
        price: 178.90,
        image: "https://down-br.img.susercontent.com/file/sg-11134201-7rd6g-lwzxw7nfhf8g8c.webp",
        link: "https://s.shopee.com.br/gFBhciwY0"
    },
    {
        name: "Robô Aspirador",
        price: 59.99,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m0ehkmzn6oox1c@resize_w450_nl.webp",
        link: "https://s.shopee.com.br/gFBfjD0iR"
    },
    {
        name: "Kit Cozinha MasterChef",
        price: 33.55,
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lymnuq0mfjpx9c@resize_w450_nl.webp",
        link: "https://s.shopee.com.br/3fslp4Ri6M"
    }
];
