import type { Dictionary } from '../useTranslations';

export const fr: Dictionary = {
  skipLink: 'Aller au contenu',
  nav: {
    inicio: 'Accueil',
    'sobre-nosotros': 'À propos',
    productos: 'Produits',
    empleo: 'Emploi',
    contacto: 'Contact',
  },
  common: {
    call: 'Appeler',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    whatsappWrite: 'Écrire sur WhatsApp',
    scheduleAlmacen: 'Entrepôt',
    scheduleExpo: 'Exposition',
    scheduleAbierto: 'Ouvert',
    scheduleCerrado: 'Fermé',
    verTodasLasMarcas: 'Voir toutes les marques',
  },
  cookieBanner: {
    title: 'Votre vie privée',
    descriptionBefore: 'Nous utilisons des cookies techniques nécessaires au fonctionnement du site. Avec votre autorisation, nous chargeons aussi du contenu tiers (carte et fil Instagram) qui utilise ses propres cookies. ',
    moreInfo: 'Plus d’informations',
    reject: 'Refuser',
    acceptAll: 'Tout accepter',
  },
  gatedEmbed: {
    textTemplate: 'Ce contenu charge {value} et utilise des cookies tiers. Activez-le si vous en acceptez l’utilisation.',
    accept: 'Accepter et afficher',
    mapLabel: 'la carte Google',
    mapTitle: 'Localisation de Construdepot by Quiles à Elche',
    instagramLabel: 'le fil Instagram',
    instagramTitle: 'Fil Instagram @construdepot_by_quiles',
  },
  footer: {
    tagline: 'Matériaux de construction, rénovation et décoration à Elche. Pour particuliers et professionnels.',
    navHeading: 'Navigation',
    contactHeading: 'Contact',
    followHeading: 'Suivez-nous',
    location: 'Elche, Alicante',
    almacenSchedule: 'Entrepôt : Lun-Ven 7h30–20h · Sam 8h30–13h30',
    expoSchedule: 'Exposition : Lun-Ven 9h–20h · Sam 9h–13h30',
    copyright: '© 2026 Construdepot by Quiles. Tous droits réservés.',
    avisoLegal: 'Mentions légales',
    privacidad: 'Confidentialité',
    cookies: 'Cookies',
    configurarCookies: 'Paramètres des cookies',
  },
  home: {
    metaTitle: 'Accueil',
    metaDescription:
      'Matériaux de construction, rénovation et décoration à Elche, Alicante. Pour particuliers et professionnels. Votre rénovation intelligente commence ici.',
    hero: {
      eyebrow: 'Entrepôt de matériaux · Elche, Alicante',
      titleBefore: 'Votre rénovation ',
      titleEm: 'intelligente',
      titleAfter: ' commence ici',
      sub: 'Matériaux de construction, rénovation et décoration avec les conseils que vous méritez. Pour particuliers et professionnels.',
      ctaPrimary: 'Vérifier la disponibilité',
      ctaGhost: 'Voir les catégories de produits',
      location: 'Elche, Alicante',
      hours: 'Entrepôt 7h30–20h · Exposition 9h–20h',
      badgePublic: 'Ouvert au public',
      scrollCue: 'Découvrir plus',
    },
    trust: { rating: '4,5/5', note: '· 247 avis Google', link: 'Voir sur Google' },
    testimonials: {
      eyebrow: 'Témoignages',
      title: 'Ce que disent nos clients',
      sub: 'Avis authentiques de notre fiche Google, traduits de l’espagnol original.',
      reviewsWord: 'avis',
      localGuide: 'Guide Local',
      translatedNote: 'Traduit de l’espagnol',
      quotes: [
        'Des matériaux de très bonne qualité à un très bon prix. L’amabilité et le service de Pepe sont incomparables. Il m’a recommandé un maçon, qui m’a refait une grande salle de bain en une semaine. Je suis très satisfait de cette entreprise.',
        'Après plusieurs rénovations, c’est toujours ici que nous trouvons le meilleur prix et le meilleur service. Pepe comme Tania sont très compétents et vous aident à trouver la meilleure option pour chaque pièce. Nous avons comparé de nombreux endroits au fil des années, et le meilleur rapport qualité/prix se trouve sans aucun doute chez Construdepot.',
        'Excellent entrepôt avec des matériaux de construction de première qualité à très bon prix. Très recommandable.',
        'Bon service, bons matériaux et très attentionnés. Nous sommes allés voir des matériaux à plusieurs endroits et avons fini par tout acheter là-bas. Pepe nous a traités comme des proches et s’est adapté à tous nos besoins.',
        'Je tiens à remercier pour l’excellent service et les conseils que j’ai reçus. On m’a recommandé cette entreprise de matériaux et l’expérience a été parfaite. Ils m’ont aidé à choisir le sol de ma maison, ont répondu à toutes mes questions avec beaucoup de professionnalisme et m’ont conseillé la meilleure option selon mes besoins. La qualité des matériaux est excellente et le résultat final a dépassé mes attentes. Je leur ferai à nouveau confiance sans hésiter et les recommanderai à quiconque cherche de bons matériaux et un service proche et professionnel.',
        'Super aimables !!! Ils m’ont très bien pris en charge, ont répondu à toutes mes questions et m’ont aidé à trouver exactement les sols et les meubles que j’avais en tête !!! Je les recommande à 100 %.',
      ],
    },
    projectCta: {
      eyebrow: 'Vous avez aussi un projet ?',
      title: 'Parlez-nous-en et on vous aide pour les matériaux',
      sub: 'Choisissez ce qui se rapproche le plus du vôtre, ou écrivez-nous directement — pas besoin de connaître les termes techniques.',
      buttons: [
        { label: 'Construction neuve', param: 'faire une construction neuve' },
        { label: 'Rénovation complète d’un local ou d’un logement', param: 'faire une rénovation complète de mon local ou logement' },
        { label: 'Rénover la salle de bain', param: 'rénover la salle de bain' },
        { label: 'Rénover la cuisine', param: 'rénover la cuisine' },
        { label: 'Problèmes d’humidité', param: 'résoudre un problème d’humidité' },
        { label: 'Problèmes d’isolation', param: 'résoudre un problème d’isolation' },
        { label: 'Rénover le jardin', param: 'rénover le jardin' },
        { label: 'Autres projets', param: 'parler de mon projet' },
      ],
    },
    howWeWork: {
      eyebrow: 'Comment nous travaillons',
      title: 'Un chemin différent pour chacun',
      sub: 'Particuliers et professionnels cherchent des choses différentes. Nous les traitons différemment aussi.',
      particulares: {
        title: 'Particuliers',
        desc: 'Vous arrivez avec une rénovation en tête et mille questions sur les matériaux. Nous vous conseillons matériau par matériau, sans jargon, pour que vous fassiez le bon choix du premier coup.',
        link: 'Voir les catégories de produits',
      },
      profesionales: {
        title: 'Professionnels',
        desc: 'Votre chantier ne peut pas s’arrêter. Approvisionnement rapide, contact direct et matériaux techniques pensés pour le rythme réel d’un chantier.',
        link: 'Nous contacter en tant que professionnel',
      },
    },
    catalog: {
      eyebrow: 'Catalogue',
      title: 'Tout ce dont vous avez besoin, par catégorie',
      sub: 'Cinq catégories, le même conseil honnête dans chacune.',
      teasers: {
        'estructura-y-obra': 'Béton, briques, mortiers',
        'acabados-y-revestimientos': 'Sols, grès, parquet',
        'decoracion-y-pintura': 'Peintures, émaux, pinceaux',
        'fontaneria-y-climatizacion': 'Robinetterie, sanitaires, climatisation',
        'jardin-y-exterior': 'Gazon synthétique, béton imprimé',
      },
    },
    brands: {
      eyebrow: 'Fournisseurs',
      title: 'Marques avec lesquelles nous travaillons',
      sub: 'Plus de 25 fabricants de référence.',
      link: 'Voir toutes les marques',
    },
    instagram: { eyebrow: 'Réseaux sociaux', title: 'Suivez-nous sur Instagram' },
    map: {
      eyebrow: 'Comment venir',
      title: 'Nous sommes à Elche',
      schedule: 'Entrepôt : Lun-Ven 7h30–20h · Sam 8h30–13h30 · Exposition : Lun-Ven 9h–20h · Sam 9h–13h30',
    },
    finalCta: {
      title: 'Un projet en tête ? Parlons-en dès aujourd’hui.',
      ctaPrimary: 'Vérifier la disponibilité',
      ctaWhatsapp: 'Écrire sur WhatsApp',
    },
  },
  productos: {
    metaTitle: 'Produits',
    metaDescription:
      'Tout ce dont vous avez besoin, par catégorie. Structure et gros œuvre, finitions, décoration et peinture, plomberie et climatisation, jardin et extérieur.',
    breadcrumbCurrent: 'Produits',
    h1: 'Tout ce dont vous avez besoin, par catégorie. Sans détour.',
    sub: 'Cinq catégories, le même conseil honnête dans chacune.',
    eyebrow: 'Catalogue par catégorie',
    title: 'Trouvez votre catégorie',
    sectionSub: 'Nous travaillons avec les meilleures marques. Si nous ne l’avons pas en stock, nous vous disons quand elle sera disponible.',
    verProveedores: 'Voir tous les fournisseurs',
    searchPlaceholder: 'Recherchez un produit, une marque, ou même une pièce de votre maison…',
    searchAriaLabel: 'Rechercher un produit, une marque ou une pièce de la maison',
    searchExamples: ['carrelage', 'salle de bain', 'ciment', 'jardin', 'peinture', 'robinetterie'],
    searchEmptyBefore: 'Nous n’avons rien trouvé avec ce terme — essayez un autre mot, ou ',
    searchEmptyLink: 'demandez-nous sur WhatsApp',
    categoriaTag: 'Catégorie',
    marcasLabel: 'Marques :',
    consultar: 'Vérifier la disponibilité',
    ctaBandText: 'Vous ne trouvez pas ce que vous cherchez ? Demandez-nous directement : nous connaissons le catalogue mieux qu’aucun moteur de recherche.',
    ctaBandButton: 'Écrire sur WhatsApp',
    prefillCategoria: 'Je suis intéressé(e) par la catégorie : {value}. ',
    bannerCategoria: 'Vous nous écrivez au sujet de : {value}. Remplissez le formulaire et nous vous recontactons avec la disponibilité.',
  },
  contacto: {
    metaTitle: 'Contact',
    metaDescription: 'Nous sommes là pour vous aider. Choisissez comment vous préférez nous parler. WhatsApp, formulaire, ou venez nous voir à Elche.',
    breadcrumbCurrent: 'Contact',
    h1: 'Nous sommes là pour vous aider',
    bannerSubDefault: 'Choisissez comment vous préférez nous parler.',
    formEyebrow: 'Formulaire',
    formTitle: 'Dites-nous ce dont vous avez besoin',
    requiredNote: 'champ obligatoire',
    whoAreYou: 'Qui êtes-vous ?',
    perfilParticular: 'Particulier',
    perfilProfesional: 'Professionnel',
    fieldNombre: 'Nom',
    placeholderNombre: 'Votre nom',
    fieldTelefono: 'Téléphone',
    placeholderTelefono: 'Votre téléphone',
    fieldEmail: 'E-mail',
    placeholderEmail: 'Votre e-mail',
    fieldMensaje: 'Quel matériau ou catégorie vous intéresse ?',
    placeholderMensaje: 'Dites-nous ce dont vous avez besoin',
    fieldFoto: 'Photo',
    fotoHelp: 'Si vous avez une photo du chantier ou du matériau que vous souhaitez assortir, ajoutez-la ici.',
    submit: 'Envoyer la demande',
    formStatusDefault: 'Nous répondons le jour ouvré même. Pour les demandes urgentes, WhatsApp est plus rapide que le formulaire.',
    formAgain: 'Besoin de nous envoyer autre chose ? Remplir à nouveau',
    directEyebrow: 'Coordonnées directes',
    directTitle: 'Ou contactez-nous dès maintenant',
    whatsappCardTitle: 'WhatsApp',
    whatsappCardText: ', le moyen le plus rapide',
    ubicacionCardTitle: 'Localisation',
    ubicacionText: 'N-340, Partida Jubalcoy, pol. 1, n° 74 · 03295 Elche, Alicante, Espagne',
    horarioCardTitle: 'Horaires',
    horarioAlmacenLabel: 'Entrepôt',
    horarioAlmacenText: 'Lun-Ven 7h30–20h · Sam 8h30–13h30',
    horarioExpoLabel: 'Exposition',
    horarioExpoText: 'Lun-Ven 9h–20h · Sam 9h–13h30',
    horarioNota: 'Fermé le dimanche. Si vous avez besoin d’être reçu à un autre horaire, vous pouvez prendre rendez-vous sur WhatsApp.',
    telefonoCardTitle: 'Téléphone fixe et e-mail',
    mapaEyebrow: 'Comment venir',
    mapaTitle: 'Carte',
    prefillCategoria: 'Je suis intéressé(e) par la catégorie : {value}. ',
    bannerCategoria: 'Vous nous écrivez au sujet de : {value}. Remplissez le formulaire et nous vous recontactons avec la disponibilité.',
    prefillProyecto: 'Je souhaite {value}. ',
    bannerProyecto: 'Vous nous écrivez parce que vous souhaitez {value}. Dites-nous en plus et nous vous indiquerons ce qu’il vous faut.',
    sending: 'Envoi en cours…',
    success: 'Merci, nous avons bien reçu votre demande. Nous vous recontactons rapidement. Si c’est urgent, écrivez-nous directement sur WhatsApp.',
    genericError: 'Nous n’avons pas pu envoyer votre demande.',
    errorSuffix: 'Si le problème persiste, écrivez-nous sur WhatsApp : +34 607 224 454.',
    networkError: 'Nous n’avons pas pu envoyer votre demande. Réessayez ou écrivez-nous sur WhatsApp : +34 607 224 454.',
    photoTooLarge: 'La photo est trop lourde et nous n’avons pas pu la compresser automatiquement. Essayez une autre photo ou envoyez-la nous sur WhatsApp : +34 607 224 454.',
  },
  sobreNosotros: {
    metaTitle: 'À propos',
    metaDescription: 'Derrière Construdepot, il y a une équipe, pas seulement un entrepôt. Des matériaux de construction avec un nom et un visage familier à Elche.',
    breadcrumbCurrent: 'À propos',
    h1: 'Derrière Construdepot, il y a une équipe, pas seulement un entrepôt',
    sub: 'Des matériaux de construction avec un nom et un visage familier à Elche.',
    espacioEyebrow: 'Notre espace',
    espacioTitle: 'Une vraie exposition et un vrai entrepôt',
    espacioSub: 'De vraies photos du magasin à Elche. Voici ce que vous allez trouver.',
    exposicionTitle: 'Exposition',
    exposicionDesc: 'Une vaste exposition pour vous aider à rénover votre logement, salle de bain, cuisine…',
    exposicionRegion: 'Photos de l’exposition',
    exposicionPrev: 'Voir les photos précédentes de l’exposition',
    exposicionNext: 'Voir plus de photos de l’exposition',
    almacenTitle: 'Entrepôt',
    almacenDesc: 'Nous disposons d’une cour de 10 000 m² où nous stockons toutes sortes de produits, pour que vous puissiez charger des palettes complètes de tout ce que vous pouvez imaginer : clôtures, façades, plinthes, jardins, enceintes, etc.',
    almacenRegion: 'Photos de l’entrepôt',
    almacenPrev: 'Voir les photos précédentes de l’entrepôt',
    almacenNext: 'Voir plus de photos de l’entrepôt',
    lightboxClose: 'Fermer',
    lightboxPrev: 'Photo précédente',
    lightboxNext: 'Photo suivante',
    valoresEyebrow: 'Ce qui nous définit',
    valoresTitle: 'Nos valeurs',
    valores: [
      { titulo: 'Proximité réelle', desc: 'Nous ne sommes pas une chaîne. Nous connaissons nos clients et les accompagnons dans chaque décision, d’un simple carreau à la fourniture complète d’un chantier.' },
      { titulo: 'Conseils honnêtes', desc: 'Nous vous disons ce dont vous avez besoin, pas ce qui nous arrange de vendre. Si un matériau ne convient pas à votre projet, nous vous aidons à en trouver un autre.' },
      { titulo: 'Engagement envers Elche', desc: 'Nous sommes d’ici. Nous connaissons les chantiers de la région et ce dont chaque type de rénovation a besoin.' },
    ],
    equipoEyebrow: 'L’équipe',
    equipoTitle: 'Qui s’occupe de vous',
    equipoSub: 'Des visages et des noms réels, pour que vous sachiez à qui vous parlez avant même de venir au magasin.',
    equipoTag: 'Équipe',
    whatsappTeam: 'Écrire sur WhatsApp',
    whatsappTeamPrefill: 'Bonjour, je voudrais parler avec {nombre} ({puesto})',
    equipo: [
      { puesto: 'Gérant', descripcion: 'Gérant. Le grand chef, le dernier mot lui revient toujours.' },
      { puesto: 'Agent commercial', descripcion: 'Agent commercial. Coordonne chaque commande pour qu’elle parte à temps.' },
      { puesto: 'Logistique et commercial', descripcion: 'Opérateur logistique et commercial. Responsable du stock de l’entrepôt et une référence pour les clients — parle parfaitement arabe.' },
      { puesto: 'Administration', descripcion: 'Administration et comptabilité. La meilleure équipe pour tenir les comptes à jour.' },
      { puesto: 'Chauffeur-livreur', descripcion: 'Chauffeur-livreur. Livre le matériel là où d’autres n’arrivent pas.' },
      { puesto: 'Entrepôt', descripcion: 'Opérateur d’entrepôt. Votre marchandise sort mieux rangée et protégée que chez vous.' },
      { puesto: 'Entrepôt', descripcion: 'Responsable des chargements de l’entrepôt. Celui qui fait le plus de kilomètres sur un chariot élévateur.' },
      { puesto: 'Informatique', descripcion: 'Informaticien et expert en IA. Si quelque chose ne va pas sur le site, il l’a déjà réparé avant même que vous le remarquiez.' },
      { puesto: 'Commerciale', descripcion: 'Commerciale. La plus sympathique de l’équipe, elle résout n’importe quelle question avant même que vous ayez fini de la poser.' },
    ],
    ctaText: 'Un projet en tête ? Venez nous voir ou écrivez-nous, nous vous conseillons sans engagement.',
    ctaButton: 'Vérifier la disponibilité',
  },
  empleo: {
    metaTitle: 'Emploi',
    metaDescription: 'Travaillez avec nous chez Construdepot by Quiles : postes ouverts à Elche et candidatures spontanées pour de futures opportunités.',
    breadcrumbCurrent: 'Emploi',
    h1: 'Construisons notre équipe ensemble',
    sub: 'ConstruDepot continue de grandir et nous voulons des personnes qui veulent grandir avec nous.',
    areasEyebrow: 'Travaillez avec nous',
    areasTitle: 'Nous recherchons des professionnels pour ces domaines',
    areasSub: 'Nous recherchons des professionnels pour rejoindre les différents domaines de notre entreprise :',
    areas: ['Entrepôt et logistique', 'Magasin et exposition', 'Ventes et service client', 'Administration'],
    areasClosing: 'Si vous êtes une personne responsable, travailleuse et motivée à rejoindre une équipe dynamique, nous voulons vous connaître.',
    teamPreviewText: 'Voici l’équipe avec qui vous travailleriez : des visages et des noms réels, les mêmes qui vous accueilleront en magasin.',
    teamPreviewLink: 'Découvrez toute l’équipe',
    positionsEyebrow: 'Postes ouverts',
    positionsTitleWithJobs: 'Voici ce dont nous avons besoin en ce moment',
    positionsTitleNoJobs: 'Il n’y a aucun poste ouvert pour le moment',
    positionsSubWithJobs: 'Cliquez sur un poste pour voir les détails et postuler directement depuis là.',
    positionsSubNoJobs: 'Laissez votre candidature ci-dessous et nous la conserverons pour dès qu’une opportunité se présente.',
    jobListingsNote: 'Les offres d’emploi sont publiées en espagnol, la langue utilisée pour le recrutement.',
    applyButton: 'Postuler à ce poste',
    spontaneousTitle: 'Vous voulez rejoindre ConstruDepot ?',
    spontaneousText: 'Même si aucun poste publié ne correspond à votre profil pour le moment, vous pouvez tout de même nous envoyer votre CV. Nous étudierons votre candidature pour de futures opportunités au sein de l’entreprise.',
    spontaneousButton: 'Envoyer mon CV',
    spontaneousLabel: 'Candidature spontanée',
    contactClosingBefore: 'Vous préférez en parler avant d’écrire ? Appelez-nous ou écrivez-nous sur ',
    contactClosingMiddle: ' au +34 607 224 454 ou à ',
    formEyebrow: 'Candidature',
    formTitle: 'Vos coordonnées',
    requiredNote: 'champ obligatoire',
    fieldNombre: 'Nom',
    placeholderNombre: 'Votre nom',
    fieldTelefono: 'Téléphone',
    placeholderTelefono: 'Votre téléphone',
    fieldEmail: 'E-mail',
    placeholderEmail: 'Votre e-mail',
    fieldMensaje: 'Votre expérience ou ce que vous recherchez',
    placeholderMensaje: 'Parlez-nous de votre expérience ou du type de poste que vous recherchez',
    fieldCv: 'CV (PDF)',
    cvHelp: 'Maximum 2 Mo. Si vous n’en avez pas, le message ci-dessus nous suffit.',
    consentBefore: 'J’ai lu et j’accepte la ',
    consentLink: 'politique de confidentialité',
    consentAfter: ', et j’autorise le traitement de mes données pour ce processus de sélection.',
    submit: 'Envoyer ma candidature',
    formStatusDefault: 'Nous examinons les candidatures et vous contactons si cela correspond à un poste ouvert.',
    sending: 'Envoi en cours…',
    success: 'Merci, nous avons bien reçu votre candidature. Nous vous contacterons si cela correspond à un poste ouvert.',
    genericError: 'Nous n’avons pas pu envoyer votre candidature.',
    errorSuffix: 'Si le problème persiste, écrivez-nous sur WhatsApp : +34 607 224 454.',
    networkError: 'Nous n’avons pas pu envoyer votre candidature. Réessayez ou écrivez-nous sur WhatsApp : +34 607 224 454.',
    cvNotPdf: 'Le CV doit être un fichier PDF.',
    cvTooLarge: 'Le CV est trop lourd (maximum 2 Mo).',
  },
  legal: {
    translationDisclaimer: 'Cette page est une traduction fournie à titre d’aide. Le texte juridiquement contraignant est la version en espagnol.',
  },
  notFound: {
    breadcrumbCurrent: 'Erreur 404',
    h1: "Cette page n'existe pas",
    sub: 'Le lien est peut-être cassé ou la page a été déplacée. Essayez plutôt ceci :',
    destinos: [
      { titulo: 'Accueil', desc: "Retournez à la page d'accueil." },
      { titulo: 'À propos', desc: 'Découvrez l’équipe et notre entrepôt.' },
      { titulo: 'Produits', desc: 'Consultez le catalogue par catégorie.' },
      { titulo: 'Fournisseurs', desc: 'Les marques avec lesquelles nous travaillons.' },
      { titulo: 'Emploi', desc: 'Postes ouverts et candidatures spontanées.' },
      { titulo: 'Contact', desc: 'Écrivez-nous ou appelez-nous directement.' },
    ],
    ctaText: "Vous n'avez toujours pas trouvé ce que vous cherchiez ? Demandez-nous directement.",
    ctaButton: 'Écrire sur WhatsApp',
  },
  proveedores: {
    metaTitle: 'Fournisseurs',
    metaDescription: 'Les marques avec lesquelles nous travaillons chez Construdepot by Quiles : carrelage et sols, salles de bain, Pladur et bien plus.',
    breadcrumbCurrent: 'Fournisseurs',
    h1: 'Les marques avec lesquelles nous travaillons',
    sub: 'Nous travaillons avec des fabricants de référence dans chaque catégorie. Vous cherchez une marque en particulier ? Demandez-nous.',
    groupNames: {
      'Azulejo y pavimento': 'Carrelage et sols',
      Baños: 'Salles de bain',
      'Resto de productos': 'Autres produits',
      Pladur: 'Pladur',
    },
    verEn: 'Voir dans',
    ctaText: 'Vous cherchez une marque que vous ne voyez pas ici ? Demandez-nous, nous pouvons sûrement l’obtenir.',
    ctaButton: 'Écrire sur WhatsApp',
  },
  avisoLegal: {
    metaTitle: 'Mentions légales',
    metaDescription: 'Mentions légales de Construdepot by Quiles conformément à la loi espagnole 34/2002 (LSSI-CE).',
    breadcrumbCurrent: 'Mentions légales',
    h1: 'Mentions légales',
    sub: 'Informations sur le titulaire de ce site, conformément à la loi espagnole 34/2002 relative aux services de la société de l’information et au commerce électronique (LSSI-CE).',
    updatedLabel: 'Dernière mise à jour : juillet 2026',
    bodyHtml: `
      <h2>1. Données d’identification du titulaire</h2>
      <p>En application de l’article 10 de la LSSI-CE, les informations suivantes sont communiquées :</p>
      <ul>
        <li><strong>Nom commercial :</strong> Construdepot by Quiles</li>
        <li><strong>Raison sociale :</strong> Autoservicio Construcción Elche, S.L.</li>
        <li><strong>Numéro fiscal (CIF) :</strong> B75399659</li>
        <li><strong>Objet social :</strong> Installation et services de plomberie, climatisation, gaz, électricité et maintenance des installations. Achat-vente et fourniture de matériaux de construction, quincaillerie, constructions et bâtiments, installations de plomberie, installations électriques et traitements de l’eau.</li>
        <li><strong>Siège social :</strong> N-340, Partida Jubalcoy, pol. 1, n° 74 · 03295 Elche, Alicante, Espagne</li>
        <li><strong>E-mail :</strong> <a href="mailto:info@construdepot.es">info@construdepot.es</a></li>
        <li><strong>Téléphone :</strong> <a href="tel:+34607224454">+34 607 224 454</a> (WhatsApp) · <a href="tel:+34965799179">+34 965 79 91 79</a> (fixe)</li>
        <li><strong>Immatriculation :</strong> Registre du commerce d’Alicante, Section 8, Feuille A-194439 (inscription 1, 2024).</li>
      </ul>
      <h2>2. Objet</h2>
      <p>Ce site web a pour objet d’informer sur l’activité de Construdepot by Quiles (vente de matériaux de construction, de rénovation et de décoration à Elche, Alicante) et de faciliter le contact avec les particuliers et les professionnels. Il n’inclut pas de vente en ligne ni de traitement de paiements.</p>
      <h2>3. Conditions d’utilisation</h2>
      <p>L’accès et l’utilisation de ce site confèrent la qualité d’utilisateur et impliquent l’acceptation, dès cet accès, des conditions énoncées ici. L’utilisateur s’engage à faire un usage approprié des contenus et services proposés, et à ne pas les utiliser pour se livrer à des activités illicites, portant atteinte aux droits de tiers, ou pouvant de quelque manière que ce soit endommager, rendre inutilisable ou détériorer le site web.</p>
      <h2>4. Propriété intellectuelle et industrielle</h2>
      <p>La conception, la programmation, les textes et les images propres à ce site web appartiennent à Construdepot by Quiles et sont protégés par la réglementation en matière de propriété intellectuelle et industrielle. Leur reproduction, distribution ou transformation sans autorisation expresse est interdite, sauf pour un usage personnel et privé.</p>
      <p>Les logos et marques des fabricants présentés dans la section Fournisseurs et ailleurs sur le site sont des marques déposées appartenant à leurs titulaires respectifs. Ils sont affichés uniquement à des fins d’identification, pour indiquer quels fabricants et produits Construdepot by Quiles commercialise, en vertu du droit de référencer la marque d’autrui lors de la revente de produits originaux (épuisement du droit des marques, art. 36-37 de la loi espagnole 17/2001 sur les marques). Leur utilisation n’implique aucun parrainage, affiliation officielle ni approbation de la part de ces fabricants, sauf indication expresse contraire.</p>
      <h2>5. Liens vers des tiers</h2>
      <p>Ce site inclut des liens et du contenu intégré de tiers (Google Maps, Instagram, WhatsApp) dont Construdepot by Quiles ne contrôle pas le contenu et n’assume aucune responsabilité. Leur utilisation est soumise aux conditions et politiques de confidentialité de chaque fournisseur.</p>
      <h2>6. Législation applicable</h2>
      <p>Les présentes conditions sont régies par la législation espagnole. Pour tout litige découlant de l’utilisation de ce site, les parties se soumettent aux juridictions du domicile de l’utilisateur, lorsque la réglementation en matière de consommation le permet.</p>
      <h2>7. Contact</h2>
      <p>Pour toute question concernant ces mentions légales, vous pouvez écrire à <a href="mailto:info@construdepot.es">info@construdepot.es</a>.</p>
    `,
  },
  politicaPrivacidad: {
    metaTitle: 'Politique de confidentialité',
    metaDescription: 'Comment Construdepot by Quiles traite les données personnelles des personnes qui utilisent ce site, conformément au RGPD et à la loi espagnole LOPDGDD.',
    breadcrumbCurrent: 'Politique de confidentialité',
    h1: 'Politique de confidentialité',
    sub: 'Comment nous traitons vos données personnelles lorsque vous utilisez le formulaire de contact ou naviguez sur ce site.',
    updatedLabel: 'Dernière mise à jour : août 2026',
    bodyHtml: `
      <h2>1. Responsable du traitement</h2>
      <ul>
        <li><strong>Nom commercial :</strong> Construdepot by Quiles</li>
        <li><strong>Raison sociale et numéro fiscal :</strong> Autoservicio Construcción Elche, S.L. · B75399659</li>
        <li><strong>Siège social :</strong> N-340, Partida Jubalcoy, pol. 1, n° 74 · 03295 Elche, Alicante, Espagne</li>
        <li><strong>E-mail :</strong> <a href="mailto:info@construdepot.es">info@construdepot.es</a></li>
      </ul>
      <h2>2. Quelles données nous traitons et pourquoi</h2>
      <h3>Formulaire de contact</h3>
      <p>Lorsque vous remplissez le formulaire de la page Contact, nous traitons les données que vous nous fournissez volontairement : nom, téléphone, e-mail (facultatif), le message ou la catégorie de produit que vous indiquez et, si vous la joignez, une photo du chantier ou du matériau que vous souhaitez assortir. Nous les utilisons exclusivement pour répondre à votre demande et, le cas échéant, gérer la relation commerciale qui pourrait en découler.</p>
      <p>Le formulaire est traité par un script propre hébergé sur notre serveur, qui envoie votre demande par e-mail via Microsoft 365 (API Microsoft Graph) et vérifie que vous n’êtes pas un robot grâce à Cloudflare Turnstile avant que le message n’atteigne notre boîte de réception.</p>
      <h3>Formulaire d’emploi / candidatures</h3>
      <p>Si vous envoyez une candidature depuis la page Emploi, nous traitons les données que vous nous fournissez volontairement : nom, téléphone, e-mail, votre expérience ou le message que vous rédigez et, si vous le joignez, votre CV au format PDF. Ces données sont utilisées exclusivement pour évaluer votre candidature dans le cadre de notre processus de sélection, et sont envoyées par le même circuit technique que le formulaire de contact (Microsoft 365 via l’API Microsoft Graph, avec la même vérification anti-robot Cloudflare Turnstile).</p>
      <h3>Navigation et contenu de tiers</h3>
      <p>Si vous acceptez les cookies tiers (voir la <a href="{cookiesLink}">politique de cookies</a>), ce site charge du contenu intégré de Google Maps et d’Instagram (via SnapWidget), qui peuvent traiter des données relatives à votre navigation conformément à leurs propres politiques de confidentialité.</p>
      <h2>3. Base légale</h2>
      <p>La base légale du traitement de vos données, tant pour le formulaire de contact que pour celui de candidature, est votre propre consentement, donné en remplissant et en envoyant volontairement le formulaire (art. 6.1.a du RGPD) ; pour le formulaire de candidature, également en cochant expressément la case de consentement pour le processus de sélection.</p>
      <h2>4. Conservation des données</h2>
      <p>Nous conservons les données du formulaire de contact aussi longtemps que nécessaire pour traiter votre demande et, le cas échéant, pendant la durée de la relation commerciale qui pourrait en découler, sauf si vous en demandez la suppression avant. Les données de candidature sont conservées pendant la durée du processus de sélection concerné et, au maximum, pendant une durée raisonnable pendant laquelle nous pourrions en avoir besoin pour vous considérer pour de futurs postes correspondant à votre profil, sauf si vous en demandez la suppression avant.</p>
      <h2>5. Destinataires</h2>
      <p>Nous ne cédons pas vos données à des tiers, sauf obligation légale. Les formulaires de contact et de candidature sont envoyés par e-mail via Microsoft 365 (Microsoft Corporation) et sont protégés contre les envois automatisés par Cloudflare Turnstile (Cloudflare, Inc.) — tous deux agissent en tant que sous-traitants pour la partie strictement technique de l’envoi, et non en tant que tiers ayant un accès indépendant à vos données. Si vous acceptez du contenu intégré de tiers (voir la section suivante), ces fournisseurs peuvent traiter des données relatives à votre navigation conformément à leurs propres politiques :</p>
      <ul>
        <li><strong>Google</strong> (carte intégrée) : États-Unis / UE, selon le service</li>
        <li><strong>Meta / SnapWidget</strong> (fil Instagram intégré) : États-Unis</li>
      </ul>
      <h2>6. Vos droits</h2>
      <p>Vous pouvez exercer à tout moment vos droits d’accès, de rectification, d’effacement, d’opposition, de limitation du traitement et de portabilité de vos données, en écrivant à <a href="mailto:info@construdepot.es">info@construdepot.es</a> en indiquant le droit que vous souhaitez exercer, accompagné d’une copie d’un document justifiant de votre identité.</p>
      <p>Si vous estimez que votre demande n’a pas été correctement traitée, vous pouvez déposer une réclamation auprès de l’Agence espagnole de protection des données (<a href="https://www.aepd.es" target="_blank" rel="noopener">aepd.es</a>).</p>
      <h2>7. Mesures de sécurité</h2>
      <p>Nous appliquons des mesures techniques et organisationnelles raisonnables pour protéger vos données personnelles contre les accès non autorisés, la perte ou l’altération, adaptées à l’état de la technique et à la nature des données traitées.</p>
      <h2>8. Modifications de cette politique</h2>
      <p>Nous pouvons mettre à jour cette politique de confidentialité pour l’adapter à des évolutions législatives ou à des changements sur le site. La date de dernière mise à jour figure en haut de cette page.</p>
    `,
  },
  politicaCookies: {
    metaTitle: 'Politique de cookies',
    metaDescription: 'Quels cookies ce site utilise, pour quoi faire, et comment vous pouvez les accepter ou les refuser.',
    breadcrumbCurrent: 'Politique de cookies',
    h1: 'Politique de cookies',
    sub: 'Quels cookies ce site utilise, à quoi ils servent, et comment vous pouvez les accepter ou les refuser.',
    updatedLabel: 'Dernière mise à jour : juillet 2026',
    bodyHtml: `
      <h2>1. Qu’est-ce qu’un cookie ?</h2>
      <p>Les cookies sont de petits fichiers qu’un site web enregistre dans votre navigateur pour se souvenir d’informations sur votre visite. Sous ce même terme, nous incluons également d’autres technologies de stockage local similaires (comme <em>localStorage</em>), que nous utilisons dans le même but : mémoriser votre choix concernant les cookies.</p>
      <h2>2. Cookies que nous utilisons</h2>
      <h3>Techniques / nécessaires (ne nécessitent pas votre consentement)</h3>
      <p>Nous enregistrons dans votre navigateur, via le stockage local, la préférence que vous choisissez dans l’avis sur les cookies (accepter ou refuser le contenu tiers), afin de ne plus vous la demander sur chaque page. Cette information n’est utilisée à aucune autre fin et est exemptée de consentement car strictement nécessaire au fonctionnement que vous demandez vous-même (art. 22.2 LSSI-CE).</p>
      <h3>Tiers (nécessitent votre consentement préalable)</h3>
      <p>Si vous acceptez l’avis sur les cookies, ce site charge le contenu tiers suivant, qui peut installer ses propres cookies :</p>
      <ul>
        <li><strong>Google Maps</strong> : carte intégrée sur l’Accueil et le Contact, pour indiquer notre emplacement. Voir la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">politique de confidentialité de Google</a>.</li>
        <li><strong>Instagram (SnapWidget)</strong> : fil de publications intégré sur l’Accueil. Voir la <a href="https://help.instagram.com/519522125107875" target="_blank" rel="noopener">politique de données de Meta</a>.</li>
      </ul>
      <p>Tant que vous n’acceptez pas ce contenu, aucun des deux ne se charge : vous verrez un avis avec un bouton pour l’activer, section par section, à la place de la carte ou du fil.</p>
      <p>Si nous intégrons à l’avenir des outils d’analyse web (par exemple Google Analytics), ils rejoindront cette même catégorie et seront également soumis à votre consentement préalable. Nous mettrons à jour cette page le cas échéant.</p>
      <h2>3. Comment accepter ou refuser les cookies</h2>
      <p>Lors de votre première visite sur le site, vous verrez un avis avec deux options tout aussi visibles : <strong>« Tout accepter »</strong> et <strong>« Refuser »</strong>. Votre choix est mémorisé pour vos prochaines visites. Vous pouvez également accepter le contenu d’un élément précis (par exemple, seulement la carte) directement depuis son propre avis, sans affecter le reste.</p>
      <p>Vous pouvez modifier votre décision à tout moment depuis le lien <strong>« Paramètres des cookies »</strong> dans le pied de page de n’importe quelle section du site.</p>
      <p>Vous pouvez également bloquer ou supprimer les cookies depuis les paramètres de votre navigateur ; sachez que cela peut affecter l’affichage de la carte ou du fil Instagram sur n’importe quel site, pas seulement celui-ci.</p>
      <h2>4. Contact</h2>
      <p>Pour toute question sur cette politique, écrivez-nous à <a href="mailto:info@construdepot.es">info@construdepot.es</a>.</p>
    `,
  },
};
