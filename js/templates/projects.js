export const projectsTemplate = `
  <section class="page-intro">
    <div class="container intro-inner">
      <p class="eyebrow">Esperança em movimento</p>
      <h1>Iniciativas que fazem a diferença</h1>
      <p>Conheça algumas das frentes que aproximam pessoas, compartilham oportunidades e fortalecem nossa comunidade.</p>
    </div>
  </section>

  <section class="container project-list" aria-label="Iniciativas solidárias">
    <article class="project-card">
      <img src="imagens/Img3.webp"
        srcset="imagens/Img3-400.webp 400w, imagens/Img3-768.webp 768w, imagens/Img3.webp 1536w"
        sizes="(max-width: 768px) calc(100vw - 30px), (max-width: 1200px) 50vw, 550px"
        alt="Voluntários distribuem alimentos a uma pessoa em uma ação comunitária"
        width="1536" height="1024" loading="lazy" decoding="async">
      <div class="project-copy">
        <p class="eyebrow">Cuidado e acolhimento</p>
        <h2>Rede de cuidado</h2>
        <p>Organizamos campanhas e ações de apoio para aproximar doações de famílias que precisam de itens essenciais,
          com respeito e atenção a cada realidade.</p>
        <a class="text-link" href="#/cadastro">Ajude nesta iniciativa <span aria-hidden="true">→</span></a>
      </div>
    </article>
    <article class="project-card project-card-reverse">
      <img src="imagens/Img2.webp"
        srcset="imagens/Img2-400.webp 400w, imagens/Img2.webp 757w"
        sizes="(max-width: 768px) calc(100vw - 30px), (max-width: 1200px) 50vw, 550px"
        alt="Educadora acompanha crianças durante uma oficina infantil de artes"
        width="757" height="514" loading="lazy" decoding="async">
      <div class="project-copy">
        <p class="eyebrow">Aprender e crescer</p>
        <h2>Espaço de oportunidades</h2>
        <p>Promovemos atividades educativas e de convivência que incentivam a curiosidade, a troca de conhecimentos e
          o desenvolvimento de crianças e jovens.</p>
        <a class="text-link" href="#/cadastro">Compartilhe seu tempo <span aria-hidden="true">→</span></a>
      </div>
    </article>
    <article class="project-card">
      <img src="imagens/Img4.webp"
        srcset="imagens/Img4-400.webp 400w, imagens/Img4.webp 761w"
        sizes="(max-width: 768px) calc(100vw - 30px), (max-width: 1200px) 50vw, 550px"
        alt="Voluntários recolhem resíduos em uma área pública arborizada"
        width="761" height="511" loading="lazy" decoding="async">
      <div class="project-copy">
        <p class="eyebrow">Comunidade sustentável</p>
        <h2>Comunidade em ação</h2>
        <p>Mobilizamos moradores e parceiros em ações solidárias para cuidar dos espaços comuns e cultivar relações de
          cooperação que continuem ao longo do tempo.</p>
        <a class="text-link" href="#/cadastro">Venha fazer parte <span aria-hidden="true">→</span></a>
      </div>
    </article>
  </section>

  <section class="home-callout container">
    <div>
      <p class="eyebrow">Toda ajuda conta</p>
      <h2>Seu tempo, suas ideias e sua solidariedade podem transformar uma iniciativa.</h2>
    </div>
    <a class="button button-light" href="#/cadastro">Quero participar</a>
  </section>
`;
