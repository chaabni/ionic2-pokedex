import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PokedexService } from '../../providers/pokedex-service/pokedex-service';
import { Capitalize } from '../../pipes/capitalize';
import { Loader } from '../loader/loader';

@Component({
  templateUrl: 'build/pages/pokemon-list/pokemon-list.html',
  providers: [ PokedexService ],
  directives: [ Loader ],
  pipes: [ Capitalize ]
})
export class PokemonListPage implements OnInit {

  private pokemonList: any[] = [];
  private searchQuery: string = '';

  constructor(
    private navCtrl: NavController,
    private pokedexService: PokedexService
  ) {}

  ngOnInit(){
    this.pokedexService.getAllPokemon()
      .subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  getPokemons(){
    var q = this.searchQuery;
    if (q.trim() == '') {
        return this.pokemonList;
    }
    return this.pokemonList.filter((v) => {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) >= 0) {
            return true;
        }
        return false;
    });
  }

}
