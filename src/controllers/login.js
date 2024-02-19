import {createHash} from "node:crypto"

const users = []    // Simule BDD pour le stockage des utilisateurs
const role = ['admin', 'utilisateur']

export const addUser = async (req, res) => {
    const {email, password} = req.body
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")

    let user = users.find((u) => u.email === email && u.password === hashedPassword)
    if (user) {
        res.status(401).send({
            message: "Utilisateur déjà enregistré",
            user
        })
    }

    const newUser = {
        email,
        password: hashedPassword,
        role: 'utilisateur'
    };

    users.push(newUser);

}

export const loginUser = async function (req, res) {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);

    if (!user) {
        return res.status(401).send({ message: "Utilisateur non trouvé" });
    }

    if (user.password !== hashedPassword) {
        return res.status(401).send({ message: "Mot de passe incorrect" });
    }

    const token = generateJWT(user);

    res.status(200).send({ token });
}
