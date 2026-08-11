// Lista real de proveedores facilitada por el cliente (MARCAS MAS IMPORTANTES.pdf),
// agrupada tal cual venía en el documento. El campo `logo` solo se rellena cuando
// hay un archivo real descargado de la web oficial de la marca en /public/brands/ —
// mientras no exista, el chip se muestra solo con el nombre y el enlace real, nunca
// con un logo inventado o aproximado. Fuente única compartida por /proveedores/
// (agrupado), el carrusel de Inicio (aplanado) y /productos/ (categorías derivadas
// de `categorias` en vez de mantener una lista de marcas duplicada a mano).
//
// `categorias` referencia los ids de categoriasProductos (ver categorias.ts) y solo
// se rellena cuando el tipo de producto real de la marca (comprobado en su propia
// web) encaja con una categoría de /productos/ — "si ellos lo ofrecen, nosotros lo
// podemos ofrecer también". Si una marca no encaja claramente en ninguna, se deja
// sin `categorias` en vez de forzar una.
export interface Marca {
  nombre: string;
  url: string;
  logo?: string;
  white?: boolean;
  svg?: boolean;
  categorias?: string[];
}

export const grupos: { nombre: string; marcas: Marca[] }[] = [
  {
    nombre: 'Azulejo y pavimento',
    marcas: [
      { nombre: 'Keraben', url: 'https://www.keraben.com/', logo: '/brands/keraben.png', white: true, categorias: ['acabados-y-revestimientos'] },
      { nombre: 'Peronda', url: 'https://peronda.com/es', svg: true, categorias: ['acabados-y-revestimientos'] },
      { nombre: 'KTL Cerámica', url: 'https://ktlceramica.com/', logo: '/brands/ktl.jpg', categorias: ['acabados-y-revestimientos'] },
      { nombre: 'Villaceramica', url: 'https://villaceramica.es/', logo: '/brands/villaceramica.png', categorias: ['acabados-y-revestimientos'] },
      { nombre: 'Cerámica Mediterráneo', url: 'https://www.cdmcorp.es/', logo: '/brands/cdmcorp.png', categorias: ['acabados-y-revestimientos'] },
      { nombre: 'Porcelastone', url: 'https://www.porcelastone.com/', logo: '/brands/porcelastone.png', categorias: ['acabados-y-revestimientos'] },
      { nombre: 'Realonda', url: 'https://www.realonda.com/', logo: '/brands/realonda.svg', categorias: ['acabados-y-revestimientos'] },
      { nombre: 'Alma Cerámicas', url: 'https://almaceramica.es/', logo: '/brands/almaceramica.png', categorias: ['acabados-y-revestimientos'] },
      { nombre: 'Benesol', url: 'https://benesol.es/es/', logo: '/brands/benesol.jpg', categorias: ['acabados-y-revestimientos'] },
      { nombre: 'Massima Surfaces', url: 'https://www.massimagroup.com/', logo: '/brands/massima.png', white: true, categorias: ['acabados-y-revestimientos'] },
      { nombre: 'Magnifica', url: 'https://magnificacollection.com/', logo: '/brands/magnifica.svg', categorias: ['acabados-y-revestimientos'] },
      // Comprobado en su web: pavimento y revestimiento cerámico/porcelánico, igual que el resto del grupo.
      { nombre: 'Cerámica Ribesalbes', url: 'https://www.ceramicaribesalbes.com/', categorias: ['acabados-y-revestimientos'] },
      // Harmony (colección de Peronda): azulejo y superficies decorativas.
      { nombre: 'Harmony', url: 'https://harmonyinspire.com/es', categorias: ['acabados-y-revestimientos'] },
      // Pavimento vinílico rígido SPC — mismo apartado que "Suelo vinílico (SPC/LVT)" de Acabados.
      { nombre: 'Belossa', url: 'https://belossa.com/', categorias: ['acabados-y-revestimientos'] },
    ],
  },
  {
    nombre: 'Baños',
    marcas: [
      { nombre: 'Roca', url: 'https://www.roca.es/', logo: '/brands/roca.svg', categorias: ['fontaneria-y-climatizacion'] },
      { nombre: 'Bathco', url: 'https://www.thebathcollection.com/', logo: '/brands/bathco.svg', categorias: ['fontaneria-y-climatizacion'] },
      { nombre: 'Imex', url: 'https://imexproducts.es/', logo: '/brands/imex.png', white: true, categorias: ['fontaneria-y-climatizacion'] },
      { nombre: 'Ledimex', url: 'https://ledimex.es/', logo: '/brands/ledimex.png', white: true, categorias: ['fontaneria-y-climatizacion'] },
      { nombre: 'Mediterránea del Baño', url: 'https://medimex.es/inicio/', logo: '/brands/medimex.png', categorias: ['fontaneria-y-climatizacion'] },
      { nombre: 'Profiltek', url: 'https://www.profiltek.com/', logo: '/brands/profiltek.svg', categorias: ['fontaneria-y-climatizacion'] },
      { nombre: 'Visobath', url: 'https://visobath.com/', logo: '/brands/visobath.svg', categorias: ['fontaneria-y-climatizacion'] },
      { nombre: 'Coycama', url: 'https://coycama.com/', logo: '/brands/coycama.png', categorias: ['fontaneria-y-climatizacion'] },
      // Mamparas de ducha/baño y accesorios — mismo apartado que "Platos de ducha y mamparas".
      { nombre: 'Kassandra', url: 'https://kassandra.net/', categorias: ['fontaneria-y-climatizacion'] },
    ],
  },
  {
    nombre: 'Resto de productos',
    marcas: [
      // Áridos para hormigón, mortero y obra — encaja con "Arena y gravas" / "Hormigón preparado".
      { nombre: 'Starmis', url: 'https://starmis.com/', logo: '/brands/starmis.png', categorias: ['estructura-y-obra'] },
      // Prefabricados de hormigón y poliestireno expandido (aislamiento).
      { nombre: 'Industrias Bernabé', url: 'https://industriasbernabe.com/', logo: '/brands/industrias-bernabe.png', categorias: ['estructura-y-obra'] },
      { nombre: 'Ladrillera Murciana', url: 'https://www.ladrilleramurciana.com/', logo: '/brands/ladrillera-murciana.jpg', categorias: ['estructura-y-obra'] },
      { nombre: 'Holcim', url: 'https://www.holcim.es/', logo: '/brands/holcim.svg', white: true, categorias: ['estructura-y-obra'] },
      { nombre: 'Chemical Building Project', url: 'https://chemicalbuildingproject.com/', logo: '/brands/chemicalbuildingproject.png', categorias: ['acabados-y-revestimientos'] },
      { nombre: 'Hormigones Cava', url: 'https://www.hormigonescava.es/', logo: '/brands/hormigones-cava.png', white: true, categorias: ['estructura-y-obra', 'jardin-y-exterior'] },
      { nombre: 'La Escandella', url: 'https://www.laescandella.com/es/', logo: '/brands/laescandella.png', categorias: ['estructura-y-obra'] },
      { nombre: 'SAS Prefabricados de Hormigón', url: 'https://sas1900.com/', logo: '/brands/sas1900.webp', categorias: ['jardin-y-exterior'] },
      { nombre: 'Verniprens', url: 'https://verniprens.com/', logo: '/brands/verniprens.png', categorias: ['jardin-y-exterior'] },
      // Hormigón celular curado en autoclave (bloques) — encaja con "Bloque de hormigón".
      { nombre: 'Baublock', url: 'https://baublock.com/', categorias: ['estructura-y-obra'] },
      // Aislamiento térmico/acústico e impermeabilización de cubiertas.
      { nombre: 'Chova', url: 'https://chova.com/', categorias: ['estructura-y-obra'] },
      // Ladrillos macizos y refractarios — encaja con "Ladrillo cerámico".
      { nombre: 'Cerámica Monserrat', url: 'https://ceramicamonserrat.com/', categorias: ['estructura-y-obra'] },
    ],
  },
  {
    nombre: 'Pladur',
    marcas: [
      { nombre: 'Escayescos', url: 'https://escayescos.com/', logo: '/brands/escayescos.svg', white: true, categorias: ['estructura-y-obra'] },
      { nombre: 'Levantia', url: 'https://levantia.es/', logo: '/brands/levantia.png', categorias: ['estructura-y-obra'] },
    ],
  },
];

export const todasLasMarcas: Marca[] = grupos.flatMap((g) => g.marcas);
