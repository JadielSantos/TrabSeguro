var agora, data

function proximo() {

	if (document.getElementById("usuario").value == '' || document.getElementById("senha").value == '') {
		alert('Preencha o campo com seu nome e a senha!');
	} else {
		var login = sessionStorage.getItem("login");

		if (!login) {
			sessionStorage.setItem("login", "admin");
			expiration = new Date();
			expiration.setMinutes(expiration.getMinutes() + 5);
		}

		if (document.getElementById("lembrar").checked) {
			localStorage.setItem("user", document.getElementById("usuario").value);
			localStorage.setItem("password", document.getElementById("senha").value);
			document.cookie = "lembrar";
		}

		localStorage.setItem("expire", expiration.getTime());

		window.location.href = "home.html";
	}
}

function carregar() {
	var titulo = localStorage.getItem("titulo");
	var login = sessionStorage.getItem("login");

	if (!login) {
		window.location.href = "index.html";
	}

	if (titulo) {
		document.getElementById("titulo-principal").textContent = titulo;
	}

	if (localStorage.getItem("user")) {
		agora = new Date();
		if (agora.getTime() > localStorage.getItem("expire")) {
			data = false;
			sessionStorage.removeItem("user");
		}
	}

	if (localStorage.getItem("row1")) {
		var i = 1;
		var table = document.getElementById('table').getElementsByTagName('tbody')[0];

		while (localStorage.getItem("row" + i)) {
			var row = table.insertRow(i);

			var nomeTb = row.insertCell(0);
			var emailTb = row.insertCell(1);
			var enderecoTb = row.insertCell(2);
			var cpfTb = row.insertCell(3);
			var numeroTb = row.insertCell(4);

			var dados = JSON.parse(localStorage.getItem("row" + i));

			nomeTb.appendChild(document.createTextNode(dados[0]));
			emailTb.appendChild(document.createTextNode(dados[1]));
			enderecoTb.appendChild(document.createTextNode(dados[2]));
			cpfTb.appendChild(document.createTextNode(dados[3]));
			numeroTb.appendChild(document.createTextNode(dados[4]));

			i++;
		}
	}
}

function inicio() {
	var login = sessionStorage.getItem("login");

	if (login) {
		window.location.href = "home.html";
	} else {
		localStorage.clear();
	}
}

function limparCampos() {
	document.getElementById("nome").value = '';
	document.getElementById("email").value = '';
	document.getElementById("endereco").value = '';
	document.getElementById("cpf").value = '';
	document.getElementById("numero").value = '';
}

function validarCadastro() {
	var cpf = document.getElementById("cpf").value + "";
	var email = document.getElementById("email").value + "";
	var nome = document.getElementById("nome").value + "";
	var numero = document.getElementById("numero").value + "";
	var endereco = document.getElementById("endereco").value + "";

	if (nome == "" || email == "" || endereco == "" || cpf == "" || numero == "") {
		alert('Favor preencher todos os dados!');
	} else if (!(cpf.length == 14)) {
		alert('CPF Inválido!');
	} else if (nome.length < 6) {
		alert('Favor inserir o nome completo!');
	} else if (email.search("@") < 1) {
		alert('Email Inválido!');
	} else if (numero.length < 9) {
		alert('Número de Celular Inválido!');
	} else if (endereco.length < 5) {
		alert('Endereço Inválido');
	} else {
		var table = document.getElementById('table').getElementsByTagName('tbody')[0];

		var idx = table.rows.length - 1;
		var row = table.insertRow(idx);

		var nomeTb = row.insertCell(0);
		var emailTb = row.insertCell(1);
		var enderecoTb = row.insertCell(2);
		var cpfTb = row.insertCell(3);
		var numeroTb = row.insertCell(4);

		var nomeText = document.createTextNode(document.getElementById("nome").value);
		var emailText = document.createTextNode(document.getElementById("email").value);
		var enderecoText = document.createTextNode(document.getElementById("endereco").value);
		var cpfText = document.createTextNode(document.getElementById("cpf").value);
		var numeroText = document.createTextNode(document.getElementById("numero").value);

		nomeTb.appendChild(nomeText);
		emailTb.appendChild(emailText);
		enderecoTb.appendChild(enderecoText);
		cpfTb.appendChild(cpfText);
		numeroTb.appendChild(numeroText);

		var rowToAdd = [];
		rowToAdd[0] = document.getElementById("nome").value;
		rowToAdd[1] = document.getElementById("email").value;
		rowToAdd[2] = document.getElementById("endereco").value;
		rowToAdd[3] = document.getElementById("cpf").value;
		rowToAdd[4] = document.getElementById("numero").value;

		localStorage.setItem("row" + idx, JSON.stringify(rowToAdd));

		alert('Cadastrado Com Sucesso!');
		limparCampos();
	}
}

function altera(link) {
	localStorage.setItem("titulo", link);
	switch (link) {
		case 'Home':
			document.getElementById("titulo-principal").textContent = 'Home';
			break;
		case 'Servicos':
			document.getElementById("titulo-principal").textContent = 'Servicos';
			break;
		case 'Lugares':
			document.getElementById("titulo-principal").textContent = 'Lugares';
			break;
		case 'Conta':
			document.getElementById("titulo-principal").textContent = 'Conta';
			break;
		case 'Sobre':
			document.getElementById("titulo-principal").textContent = 'Sobre';
			break;
	}
}