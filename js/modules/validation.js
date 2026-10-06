const onlyDigits = (value) => value.replace(/\D/g, "");

export function formatCpf(value) {
  return onlyDigits(value)
    .slice(0, 11)
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

export function formatPhone(value) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) {
    return digits ? `(${digits}` : "";
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  const prefixLength = digits.length > 10 ? 5 : 4;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 2 + prefixLength)}-${digits.slice(2 + prefixLength)}`;
}

export function formatCep(value) {
  const digits = onlyDigits(value).slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

function isValidCpf(value) {
  const cpf = onlyDigits(value);

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  const calculateDigit = (length) => {
    let sum = 0;

    for (let index = 0; index < length; index += 1) {
      sum += Number(cpf[index]) * (length + 1 - index);
    }

    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return calculateDigit(9) === Number(cpf[9])
    && calculateDigit(10) === Number(cpf[10]);
}

function setError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  input.setAttribute("aria-invalid", "true");

  if (error) {
    error.textContent = message;
  }
}

export function clearError(input) {
  const error = document.getElementById(`${input.id}-error`);
  input.removeAttribute("aria-invalid");

  if (error) {
    error.textContent = "";
  }
}

export function validateVolunteerForm(form) {
  let firstInvalid = null;

  for (const input of form.querySelectorAll("input[required], select[required]")) {
    clearError(input);

    if (!input.checkValidity()) {
      setError(
        input,
        input.validity.customError
          ? input.validationMessage
          : input.validity.valueMissing
            ? "Este campo é obrigatório."
            : "Confira o formato informado."
      );
      firstInvalid ||= input;
    }
  }

  const cpf = form.elements.namedItem("cpf");
  if (!cpf.validity.valueMissing && !isValidCpf(cpf.value)) {
    setError(cpf, "Informe um CPF válido, com os dígitos verificadores corretos.");
    firstInvalid ||= cpf;
  }

  const phone = form.elements.namedItem("telefone");
  const phoneDigits = onlyDigits(phone.value);
  if (!phone.validity.valueMissing && phoneDigits.length !== 10 && phoneDigits.length !== 11) {
    setError(phone, "Informe um telefone com DDD e 10 ou 11 números.");
    firstInvalid ||= phone;
  }

  const cep = form.elements.namedItem("cep");
  if (!cep.validity.valueMissing && onlyDigits(cep.value).length !== 8) {
    setError(cep, "Informe os 8 números do CEP.");
    firstInvalid ||= cep;
  }

  const contributionGroup = document.getElementById("contribuicao-group");
  const contributionError = document.getElementById("contribuicao-error");
  const hasContribution = form.querySelector('input[name="contribuicao"]:checked');

  contributionGroup.removeAttribute("aria-invalid");
  contributionError.textContent = "";

  if (!hasContribution) {
    contributionGroup.setAttribute("aria-invalid", "true");
    contributionError.textContent = "Selecione pelo menos uma forma de contribuição.";
    firstInvalid ||= contributionGroup.querySelector('input[name="contribuicao"]');
  }

  return firstInvalid;
}
