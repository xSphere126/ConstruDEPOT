// Lista real de proveedores facilitada por el cliente (MARCAS MAS IMPORTANTES.pdf),
// agrupada tal cual venía en el documento. El campo `logo` solo se rellena cuando
// hay un archivo real descargado de la web oficial de la marca en /public/brands/ —
// mientras no exista, el chip se muestra solo con el nombre y el enlace real, nunca
// con un logo inventado o aproximado. Fuente única compartida por /proveedores/
// (agrupado) y el carrusel de Inicio (aplanado).
export interface Marca {
  nombre: string;
  url: string;
  logo?: string;
  white?: boolean;
  svg?: boolean;
}

export const grupos: { nombre: string; marcas: Marca[] }[] = [
  {
    nombre: 'Azulejo y pavimento',
    marcas: [
      { nombre: 'Keraben', url: 'https://www.keraben.com/', logo: '/brands/keraben.png', white: true },
      { nombre: 'Peronda', url: 'https://peronda.com/es', svg: true },
      { nombre: 'KTL Cerámica', url: 'https://ktlceramica.com/', logo: '/brands/ktl.jpg' },
      { nombre: 'Villaceramica', url: 'https://villaceramica.es/', logo: '/brands/villaceramica.png' },
      { nombre: 'Cerámica Mediterráneo', url: 'https://www.cdmcorp.es/', logo: '/brands/cdmcorp.png' },
      { nombre: 'Porcelastone', url: 'https://www.porcelastone.com/', logo: '/brands/porcelastone.png' },
      { nombre: 'Realonda', url: 'https://www.realonda.com/', logo: '/brands/realonda.svg' },
      { nombre: 'Alma Cerámicas', url: 'https://almaceramica.es/', logo: '/brands/almaceramica.png' },
      { nombre: 'Benesol', url: 'https://benesol.es/es/', logo: '/brands/benesol.jpg' },
      { nombre: 'Massima Surfaces', url: 'https://www.massimagroup.com/', logo: '/brands/massima.png', white: true },
      { nombre: 'Magnifica', url: 'https://magnificacollection.com/', logo: '/brands/magnifica.svg' },
      { nombre: 'Cerámica Ribesalbes', url: 'https://www.ceramicaribesalbes.com/' },
      { nombre: 'Harmony', url: 'https://harmonyinspire.com/es' },
      { nombre: 'Belossa', url: 'https://belossa.com/' },
    ],
  },
  {
    nombre: 'Baños',
    marcas: [
      { nombre: 'Roca', url: 'https://www.roca.es/', logo: '/brands/roca.svg' },
      { nombre: 'Bathco', url: 'https://www.thebathcollection.com/', logo: '/brands/bathco.svg' },
      { nombre: 'Imex', url: 'https://imexproducts.es/', logo: '/brands/imex.png', white: true },
      { nombre: 'Ledimex', url: 'https://ledimex.es/', logo: '/brands/ledimex.png', white: true },
      { nombre: 'Mediterránea del Baño', url: 'https://medimex.es/inicio/', logo: '/brands/medimex.png' },
      { nombre: 'Profiltek', url: 'https://www.profiltek.com/', logo: '/brands/profiltek.svg' },
      { nombre: 'Visobath', url: 'https://visobath.com/', logo: '/brands/visobath.svg' },
      { nombre: 'Coycama', url: 'https://coycama.com/', logo: '/brands/coycama.png' },
      { nombre: 'Kassandra', url: 'https://kassandra.net/' },
    ],
  },
  {
    nombre: 'Resto de productos',
    marcas: [
      { nombre: 'Starmis', url: 'https://starmis.com/', logo: '/brands/starmis.png' },
      { nombre: 'Industrias Bernabé', url: 'https://industriasbernabe.com/', logo: '/brands/industrias-bernabe.png' },
      { nombre: 'Ladrillera Murciana', url: 'https://www.ladrilleramurciana.com/', logo: '/brands/ladrillera-murciana.jpg' },
      { nombre: 'Holcim', url: 'https://www.holcim.es/', logo: '/brands/holcim.svg', white: true },
      { nombre: 'Chemical Building Project', url: 'https://chemicalbuildingproject.com/', logo: '/brands/chemicalbuildingproject.png' },
      { nombre: 'Hormigones Cava', url: 'https://www.hormigonescava.es/', logo: '/brands/hormigones-cava.png', white: true },
      { nombre: 'La Escandella', url: 'https://www.laescandella.com/es/', logo: '/brands/laescandella.png' },
      { nombre: 'SAS Prefabricados de Hormigón', url: 'https://sas1900.com/' },
      { nombre: 'Verniprens', url: 'https://verniprens.com/' },
      { nombre: 'Baublock', url: 'https://baublock.com/' },
      { nombre: 'Chova', url: 'https://chova.com/' },
      { nombre: 'Cerámica Monserrat', url: 'https://ceramicamonserrat.com/' },
    ],
  },
  {
    nombre: 'Pladur',
    marcas: [
      { nombre: 'Escayescos', url: 'https://escayescos.com/', logo: '/brands/escayescos.svg', white: true },
      { nombre: 'Levantia', url: 'https://levantia.es/', logo: '/brands/levantia.png' },
    ],
  },
];

export const todasLasMarcas: Marca[] = grupos.flatMap((g) => g.marcas);
