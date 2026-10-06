export const volunteerTemplate = `
  <section class="page-intro">
    <div class="container intro-inner">
      <p class="eyebrow">Sua presença faz diferença</p>
      <h1>Vamos construir esperança juntos?</h1>
      <p>Preencha seus dados para demonstrar interesse em colaborar. Nossa equipe poderá entrar em contato para
        conversar sobre as iniciativas.</p>
    </div>
  </section>

  <section class="container form-section">
    <div class="form-aside">
      <p class="eyebrow">Cadastro de voluntário</p>
      <h2>Um primeiro passo para transformar realidades.</h2>
      <p>Conte um pouco sobre você. Os campos marcados com <span aria-hidden="true">*</span> são obrigatórios.</p>
      <div class="privacy-note">
        <strong>Seus dados com responsabilidade</strong>
        <p>Este protótipo salva os dados, inclusive o CPF, no localStorage deste navegador. Eles não são enviados à ONG
          e podem ser removidos limpando os dados do site. Evite usar um dispositivo compartilhado.</p>
      </div>
    </div>

    <form class="volunteer-form" id="volunteer-form" novalidate>
      <div class="form-grid">
        <div class="field field-full">
          <label for="nome">Nome completo <span aria-hidden="true">*</span></label>
          <input id="nome" name="nome" type="text" autocomplete="name" minlength="3" maxlength="120"
            placeholder="Ex.: Ana da Silva" required aria-describedby="nome-error">
          <small class="field-error" id="nome-error"></small>
        </div>
        <div class="field">
          <label for="email">E-mail <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" autocomplete="email" maxlength="254"
            placeholder="voce@exemplo.com" required aria-describedby="email-error">
          <small class="field-error" id="email-error"></small>
        </div>
        <div class="field">
          <label for="cpf">CPF <span aria-hidden="true">*</span></label>
          <input id="cpf" name="cpf" type="text" inputmode="numeric" autocomplete="off"
            placeholder="000.000.000-00" maxlength="14" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}"
            aria-describedby="cpf-hint cpf-error" required>
          <small class="field-hint" id="cpf-hint">Digite os 11 números do seu CPF.</small>
          <small class="field-error" id="cpf-error"></small>
        </div>
        <div class="field">
          <label for="telefone">Telefone / WhatsApp <span aria-hidden="true">*</span></label>
          <input id="telefone" name="telefone" type="tel" inputmode="tel" autocomplete="tel"
            placeholder="(00) 00000-0000" maxlength="15" pattern="\\(\\d{2}\\) \\d{4,5}-\\d{4}"
            aria-describedby="telefone-hint telefone-error" required>
          <small class="field-hint" id="telefone-hint">Inclua o DDD.</small>
          <small class="field-error" id="telefone-error"></small>
        </div>
        <div class="field">
          <label for="cep">CEP <span aria-hidden="true">*</span></label>
          <input id="cep" name="cep" type="text" inputmode="numeric" autocomplete="postal-code"
            placeholder="00000-000" maxlength="9" pattern="\\d{5}-\\d{3}"
            aria-describedby="cep-hint cep-error" required>
          <small class="field-hint" id="cep-hint">Informe os 8 números do CEP.</small>
          <small class="field-error" id="cep-error"></small>
        </div>
        <div class="field">
          <label for="disponibilidade">Disponibilidade <span aria-hidden="true">*</span></label>
          <select id="disponibilidade" name="disponibilidade" required aria-describedby="disponibilidade-error">
            <option value="" selected disabled>Selecione uma opção</option>
            <option value="semanal">Durante a semana</option>
            <option value="fim-de-semana">Finais de semana</option>
            <option value="flexivel">Tenho disponibilidade flexível</option>
          </select>
          <small class="field-error" id="disponibilidade-error"></small>
        </div>
        <fieldset class="field field-full contribution-field" id="contribuicao-group"
          aria-describedby="contribuicao-hint contribuicao-error">
          <legend>Como você gostaria de contribuir? <span aria-hidden="true">*</span></legend>
          <small class="field-hint" id="contribuicao-hint">Escolha uma ou mais opções.</small>
          <div class="contribution-options">
            <label class="checkbox-label"><input type="checkbox" name="contribuicao" value="campanhas">
              <span>Apoio em campanhas e eventos</span></label>
            <label class="checkbox-label"><input type="checkbox" name="contribuicao" value="doacoes">
              <span>Arrecadação e organização de doações</span></label>
            <label class="checkbox-label"><input type="checkbox" name="contribuicao" value="educacao">
              <span>Atividades educativas com crianças e jovens</span></label>
            <label class="checkbox-label"><input type="checkbox" name="contribuicao" value="comunicacao">
              <span>Comunicação e redes sociais</span></label>
            <label class="checkbox-label"><input type="checkbox" name="contribuicao" value="administrativo">
              <span>Apoio administrativo e organização</span></label>
            <label class="checkbox-label"><input type="checkbox" name="contribuicao" value="outros">
              <span>Outra forma de colaborar</span></label>
          </div>
          <small class="field-error" id="contribuicao-error"></small>
        </fieldset>
        <div class="field field-full">
          <label for="motivacao">Como gostaria de colaborar?</label>
          <textarea id="motivacao" name="motivacao" rows="4" maxlength="500"
            placeholder="Conte, se quiser, quais atividades ou habilidades gostaria de compartilhar."></textarea>
        </div>
        <div class="field field-full consent-field">
          <label class="checkbox-label" for="consentimento">
            <input id="consentimento" name="consentimento" type="checkbox" required
              aria-describedby="consentimento-error">
            <span>Concordo que a ONG Esperança entre em contato sobre oportunidades de voluntariado.
              <span aria-hidden="true">*</span></span>
          </label>
          <small class="field-error" id="consentimento-error"></small>
        </div>
      </div>
      <button class="button button-primary submit-button" type="submit">Enviar meu cadastro</button>
      <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
    </form>
  </section>
`;

export const successTemplate = (name) => `
  <section class="form-success" aria-labelledby="form-success-title" tabindex="-1">
    <p class="eyebrow">Cadastro de voluntário</p>
    <h2 id="form-success-title">solicitação enviada com sucesso</h2>
    <p>Obrigado, ${escapeHtml(name)}! Seus dados foram salvos somente neste navegador e não foram enviados à ONG.</p>
    <div class="success-actions">
      <a class="button button-primary" href="#/inicio">Voltar ao início</a>
      <a class="button button-light" href="#/projetos">Ver nossos projetos</a>
    </div>
  </section>
`;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}
