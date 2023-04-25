// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const {ethers} = require("hardhat");
const {expect} = require("chai");
//Describimos el nombre de la prueba en este caso, se llamara Restaurant
//we describe the name of the proof in this case it will be called restaurant
//descrevemos o nome do teste neste caso ele será chamado de restaurante
describe("Restaurant",function(){
  //aqui estamos dandole el nombre a la prueba
  // here we are indicating the name of test
  // aqui estamos dando o nome do teste
  it("Add a new dish ", async function(){
    //aqui obtenemos nuestro owner o propietario, mediante el signers obtenemos quien valida la transaccion
    // here we get our owner, through the signers we get who validates the transaction
    //aqui temos nosso proprietário, por meio dos signatários que obtemos que validam a transação. 
    const [owner, addr1]= await ethers.getSigners();
    //aqui con los ethers estamos generando los smartContracts para despues desplegarlo
    // here with the ethers we are generating the smartContracts for later deployed
    //aqui com os éteres estamos gerando os smartContracts para posterior implantação
    const Restaurant = await ethers.getContractFactory("Restaurant");
    //aqui vamos a desplegar, dado que nuestro constructor es vacio no le enviamos nada
    //here we are going to deploy, since our constructor is empty we don't send anything to it
    //aqui vamos deploy, já que nosso construtor está vazio, não enviamos nada para ele 
    const restaurant = await Restaurant.deploy();
    //con el await debido a que es asincronico, esperamos que se despliegue el contrato en el nodo de la blockchain
    // with the await we expect because it is asyncronous, we expect the contract to be deployed on the Blockchain node
    //Com a await que esperamos porque é assíncrona, esperamos que o contrato seja implantado nodo nó da blockchain.
    await restaurant.deployed();

    //aqui agregamos informacion en el addFood 
    // here we are add information to function 
    // aqui adicionamos informações sobre o addFood
    var addFood = await restaurant.addRestaurantFood(
      "https://images.app.goo.gl/YYkpa2H35JdgbLvdA",
      "pabellon",
      "Venezuela"
    );

    //aqui esperamos que se realice el minteo en la red
    // here we are waiting for the network mining to place
    //aqui esperamos que a mint em rede ocorra
    await addFood.wait();
    
    var addFood2 = await restaurant
    .connect(addr1)
    .addRestaurantFood(
      "https://images.app.goo.gl/tEWueHBaKTFWvJMh8",
      "tostada caroreña",
      "Venezuela, Carora"
    )

    await addFood2.wait();

    var foods = await restaurant.getAllRestaurantFood();
    expect(foods.length).to.equal(2);

    var foodsByOwner = await restaurant.getFoodByOwner();

    expect(foodsByOwner.length).to.equal(1);
  })
})

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
