function confirmarSair() {
    if (confirm("Deseja realmente encerrar a sessão?")) {
        window.location.href = "/logout";
    }
}
