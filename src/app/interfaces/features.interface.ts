export interface Features {
  dia:                        Date;
  estaci:                     Estaci;
  nivell_absolut?:             string;
  percentatge_volum_embassat?: string;
  volum_embassat?:             string;
}

export enum Estaci {
  EmbassamentDeDarniusBoadellaDarnius = "Embassament de Darnius Boadella (Darnius)",
  EmbassamentDeFoixCastelletILaGornal = "Embassament de Foix (Castellet i la Gornal)",
  EmbassamentDeLaBaellsCercs = "Embassament de la Baells (Cercs)",
  EmbassamentDeLaLlosaDelCavallNavès = "Embassament de la Llosa del Cavall (Navès)",
  EmbassamentDeRiudecanyes = "Embassament de Riudecanyes",
  EmbassamentDeSantPonçClarianaDeCardener = "Embassament de Sant Ponç (Clariana de Cardener)",
  EmbassamentDeSauVilanovaDeSau = "Embassament de Sau (Vilanova de Sau)",
  EmbassamentDeSiuranaCornudellaDeMontsant = "Embassament de Siurana (Cornudella de Montsant)",
  EmbassamentDeSusquedaOsor = "Embassament de Susqueda (Osor)",
}


export interface embalse{
  coordinates: number[][];
  name:string
}
