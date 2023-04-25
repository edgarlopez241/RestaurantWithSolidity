// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.0;

import "hardhat/console.sol";

contract Restaurant{
    constructor(){}

    struct MenuItem{
        address owner;
        string foodUrl;
        string foodName;
        string originCountry;
    }

    MenuItem[] private restaurantFoods;

    function addRestaurantFood(
        string memory foodUrl,
        string memory foodName,
        string memory originCountry
    ) public {
        //esta funcion agrega los diferentes platos
        // el propietario viene desde la transaccion y no desde el frontend
        // esto para evitar la participacion de terceros
        //this function adds the different plates to  
        // the owner came to transaction and not to frontend
        // it to prevent the parcipation from third parties
        //esta função agrega os diferentes pratos
        // o proprietário vem da transação e não do frontend
        // isto é para evitar o envolvimento de terceiros
        restaurantFoods.push(
            MenuItem(msg.sender,foodUrl,foodName,originCountry)
        );
    }

    //esta funcion me permite retornar el arreglo global de todas las comidas
    //retorna solo informacion
    //usamos memory, para reducir gas y costo
    //this function allows me return global array of all the meals
    //return only information
    // we use memory, to reduce gas and cost
    //esta função me permite devolver o conjunto global de todas as refeições.
    // somente informações de retorno
    //  usamos a memory, para reduzir o gás e o custo
    function getAllRestaurantFood() public view returns (MenuItem[] memory){
        return restaurantFoods;
    }

    //cuando usamos el arreglo de tipo memory, se mantiene de tipo estatico es decir su tamaño no cambia
    //when use the array of memory type, it is kept as a static type, it's size doesn't change 
    // quando se utiliza a matriz do tipo memory, ela permanece estática, ou seja, seu tamanho não muda.

    function getFoodByOwner()
    public 
    view returns (MenuItem[] memory)
    {
        //esta variable me permite contar cuantas comidas tiene el propietario
        //para luego desplegar las comidas de este propietario
        // this variable allows me to count how many meals the owner has
        // and then display this owner's meals 
        //esta variável me permite contar quantas refeições o proprietário tem
        //e depois exibir as refeições deste proprietário
        uint256 itemCount = 0;
        for(uint256 i =0; i<restaurantFoods.length; i++){
            if(restaurantFoods[i].owner == msg.sender){
                itemCount+=1;
            }
        }
        MenuItem[] memory myFoods= new MenuItem[](itemCount);
            for(uint256 i=0;i<restaurantFoods.length;i++){
                if(restaurantFoods[i].owner == msg.sender){
                    myFoods[i]= restaurantFoods[i];
                }

            }
            return myFoods;
    }

}