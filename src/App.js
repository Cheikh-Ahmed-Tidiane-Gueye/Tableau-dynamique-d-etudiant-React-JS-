// Définition du composant principal App
function App() {
    // État local pour stocker les étudiants
    const [etudiants, setEtudiants] = React.useState([]);

    // Définition des états locaux pour les données du nouvel étudiant
    const [prenom, setPrenom] = React.useState("");
    const [nom, setNom] = React.useState("");
    const [age, setAge] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [domaine, setDomaine] = React.useState("");
    const [statut, setStatut] = React.useState("En cours");
    const [alerte, setAlerte] = React.useState(null);

    // Fonction pour ajouter un nouvel étudiant
    const ajouterEtudiant = () => {
        // Vérifier si l'un des champs est vide
        if (!prenom || !nom || !age || !email || !domaine) {
            setAlerte("Veuillez remplir tous les champs avant d'ajouter un étudiant.");
            return;
        }

        // Vérifier si l'étudiant existe déjà
        const etudiantExiste = etudiants.some(
            (etudiant) => etudiant.Email === email && etudiant.Domaine === domaine
        );

        // Si l'étudiant existe, afficher l'alerte et ne pas ajouter l'étudiant
        if (etudiantExiste) {
            setAlerte("Cet étudiant existe déjà.");
            return;
        }

        // Création d'un nouvel objet étudiant avec les données fournies
        const nouvelEtudiant = {
            Prenom: prenom,
            Nom: nom,
            Age: parseInt(age) + " ans", // Convertit l'âge en nombre ici et l'ajoute à la chaîne de caractères
            Email: email,
            Domaine: domaine,
            Statut: statut,
            Termine: false // Nouvel étudiant par défaut n'est pas terminé
        };

        // Met à jour la liste des étudiants avec le nouvel étudiant
        setEtudiants([...etudiants, nouvelEtudiant]);

        // Réinitialise les champs après l'ajout de l'étudiant
        setPrenom("");
        setNom("");
        setAge("");
        setEmail("");
        setDomaine("");
    };

    // Affichage du message d'alerte après certaines actions
    React.useEffect(() => {
        if (alerte) {
            setTimeout(() => {
                setAlerte(null);
            }, 3000);
        }
    }, [alerte]);

    // Fonction pour basculer l'état "Terminé" de l'étudiant
    const toggleTermine = (index) => {
        const nouveauxEtudiants = etudiants.map((etudiant, i) => {
            if (i === index) {
                return {
                    ...etudiant,
                    Termine: !etudiant.Termine,
                    Statut: etudiant.Termine ? "En cours" : "Terminé"
                };
            }
            return etudiant;
        });
        setEtudiants(nouveauxEtudiants);
    };

    // Fonction pour supprimer un étudiant
    const supprimerEtudiant = (index) => {
        // Vérifie si l'étudiant n'est pas terminé avant de le supprimer
        if (etudiants[index].Statut !== "Terminé") {
            setAlerte("Vous ne pouvez pas supprimer un étudiant dont la formation n'est pas encore terminée.");
            return;
        }
    
        // Crée une nouvelle liste d'étudiants sans l'étudiant à supprimer
        const nouveauxEtudiants = etudiants.filter((_, i) => i !== index);
        setEtudiants(nouveauxEtudiants);
        setAlerte(null); // Réinitialise l'alerte après la suppression réussie
    };

    // État local pour le terme de recherche dans la barre de recherche
    const [searchTerm, setSearchTerm] = React.useState('');
    // État local pour stocker les étudiants filtrés
    const [filteredEtudiants, setFilteredEtudiants] = React.useState([]);
    // État local pour indiquer si la barre de recherche est active ou non
    const [isSearchActive, setIsSearchActive] = React.useState(false);

    // Effet pour filtrer les étudiants en fonction du terme de recherche
    React.useEffect(() => {
        // Filtrer les étudiants basés sur le terme de recherche
        const filteredStudents = etudiants.filter(etudiant => {
            const fullName = `${etudiant.Prenom} ${etudiant.Nom}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
        });
        // Met à jour la liste des étudiants filtrés
        setFilteredEtudiants(filteredStudents);
    }, [searchTerm, etudiants]);

    // Fonction pour gérer le changement dans la barre de recherche
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Fonction pour gérer le clic sur l'icône de recherche pour activer/désactiver la barre de recherche
    const handleIconClick = () => {
        setIsSearchActive(!isSearchActive);
    };

    // Rendu du composant
    return (
        <>
            {/* Barre de recherche animée */}
            <div className="contener-fluid d-flex justify-content-center align-items-center mt-5">
                <div className={`search ${isSearchActive ? 'active' : ''}`}>
                    <div className="icon" onClick={handleIconClick}>
                        <img src="public/images/Recherche.gif" alt="search" />
                    </div>
                    <div className="input">
                        <input
                            type="search"
                            placeholder="Rechercher (Prénom/Nom)"
                            id="mysearch"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>
            {/* Fin de la barre de recherche animée */}
            
            {/* Tableau d'étudiants */}
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    {/* Affichage du message d'alerte */}
                    <div className="alerte text-center mt-4 rounded-5">{alerte}</div>
                    <div className="col-md-10">
                        <table className="table table-striped align-middle mb-0 bg-white my-5" id="table-eleve">
                            <thead >
                                {/* Ligne d'ajout d'un nouvel étudiant */}
                                <tr className="w-100">
                                    {/* Champs de saisie pour le prénom */}
                                    <th className='py-3'>
                                        <div className="form-outline">
                                            <input
                                                type="text"
                                                id="formControlSm"
                                                className="form-control form-control-sm"
                                                autoComplete="on"
                                                placeholder=" Prénom"
                                                value={prenom}
                                                onChange={(e) => setPrenom(e.target.value)}
                                            />
                                        </div>
                                    </th>
                                    {/* Champs de saisie pour le nom */}
                                    <th className='py-3'>
                                        <div className="form-outline">
                                            <input
                                                type="text"
                                                id="formControlSm"
                                                className="form-control form-control-sm"
                                                autoComplete="on"
                                                placeholder=" Nom"
                                                value={nom}
                                                onChange={(e) => setNom(e.target.value)}
                                            />
                                        </div>
                                    </th>
                                    {/* Champs de saisie pour l'âge */}
                                    <th className='py-3'>
                                        <div className="form-outline">
                                            <input
                                                type="number"
                                                id="formControlSm"
                                                className="form-control form-control-sm"
                                                autoComplete="on"
                                                placeholder=" Age"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                            />
                                        </div>
                                    </th>
                                    {/* Champs de saisie pour l'email */}
                                    <th className='py-3'>
                                        <div className="form-outline">
                                            <input
                                                type="email"
                                                id="formControlSm"
                                                className="form-control form-control-sm"
                                                autoComplete="on"
                                                placeholder=" Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </th>
                                    {/* Champs de saisie pour le domaine d'étude */}
                                    <th className='py-3'>
                                        <div className="form-outline">
                                            <input
                                                type="text"
                                                id="formControlSm"
                                                className="form-control form-control-sm"
                                                autoComplete="on"
                                                placeholder=" Domaine d'étude"
                                                value={domaine}
                                                onChange={(e) => setDomaine(e.target.value)}
                                            />
                                        </div>
                                    </th>
                                    {/* Bouton d'ajout d'un nouvel étudiant */}
                                    <th colSpan="3" className='py-3'>
                                        <button type="button" className="btn btn-info btn-rounded text-light mx-4 w-75" onClick={ajouterEtudiant}>
                                            <h5 className="p-0 m-0">Ajouter étudiant</h5>
                                        </button>
                                    </th>
                                </tr>
                                
                                {/* En-tête du tableau */}
                                <tr className="">
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th>Age</th>
                                    <th>Email</th>
                                    <th>Domaine</th>
                                    <th>Formation</th>
                                    <th className="text-center">Action</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Zone d'affichage des étudiants filtrés */}
                                {filteredEtudiants.map((etudiant, index) => (
                                    <tr key={index} className={etudiant.Termine ? 'etudiant-termine' : ''}>
                                        {/* Affichage du prénom de l'étudiant */}
                                        <td className={etudiant.Termine ? 'text-decoration-line-through' : ''}>{etudiant.Prenom}</td>
                                        {/* Affichage du nom de l'étudiant */}
                                        <td className={etudiant.Termine ? 'text-decoration-line-through' : ''}>{etudiant.Nom}</td>
                                        {/* Affichage de l'âge de l'étudiant */}
                                        <td className={etudiant.Termine ? 'text-decoration-line-through' : ''}>{etudiant.Age}</td>
                                        {/* Affichage de l'email de l'étudiant */}
                                        <td className={etudiant.Termine ? 'text-decoration-line-through' : ''}>{etudiant.Email}</td>
                                        {/* Affichage du domaine d'étude de l'étudiant */}
                                        <td className={etudiant.Termine ? 'text-decoration-line-through' : ''}>{etudiant.Domaine}</td>
                                        {/* Affichage du statut de formation (en cours/terminé) de l'étudiant */}
                                        <td>
                                            <p className={`m-0 text-light text-center rounded-5 ${etudiant.Statut === "En cours" ? 'bg-success' : 'bg-danger'}`}>
                                                {etudiant.Statut}
                                            </p>
                                        </td>
                                        {/* Case à cocher pour marquer l'étudiant comme terminé ou non */}
                                        <td>
                                            <div className="form-check form-switch">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    id={`form11Example4-${index}`} 
                                                    checked={etudiant.Termine}
                                                    onChange={() => toggleTermine(index)}
                                                />
                                                <label className="form-check-label" htmlFor={`form11Example4-${index}`}>
                                                    {etudiant.Termine ? "Annuler" : "Terminer"}
                                                </label>
                                            </div>
                                        </td>
                                        {/* Bouton de suppression de l'étudiant */}
                                        <td>
                                            <button className="sup rounded-circle">
                                                <img 
                                                    src="public/images/poubelle.gif" 
                                                    alt="sup" 
                                                    className="rounded-circle trash" 
                                                    onClick={() => supprimerEtudiant(index)}    
                                                /> 
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

// Rendu du composant App dans l'élément avec l'ID "App"
ReactDOM.createRoot(document.getElementById('App')).render(
    <>
        <App/>
    </>
);
