document.addEventListener(
    "DOMContentLoaded",
    () => {

        const temaGuardado =
            localStorage.getItem("tema");

        if (temaGuardado === "oscuro") {

            document.body.classList.add(
                "modo-oscuro"
            );

        }

        const boton =
            document.getElementById(
                "btn-tema"
            );

        if (!boton) return;

        boton.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "modo-oscuro"
                );

                if (
                    document.body.classList.contains(
                        "modo-oscuro"
                    )
                ) {

                    localStorage.setItem(
                        "tema",
                        "oscuro"
                    );

                    boton.textContent = "☀️";

                } else {

                    localStorage.setItem(
                        "tema",
                        "claro"
                    );

                    boton.textContent = "🌙";

                }

            }
        );

        if (
            document.body.classList.contains(
                "modo-oscuro"
            )
        ) {

            boton.textContent = "☀️";

        }

    }
);