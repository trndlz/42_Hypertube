import React from "react";

const internationalization = (language) => {
    switch (language) {
        case 'fr':
            return {
                "settings": "Paramètres",
                "logout": "Déconnexion",
                "search": "Rechercher",
                "filterBy": "Filtrer par",
                "sortBy": "Trier par",
                "action": "Action",
                "adventure": "Aventure",
                "animation": "Animation",
                "comedy": "Comedie",
                "crime": "Crime",
                "documentary": "Documentaire",
                "drama": "Drame",
                "family": "Famille",
                "fantasy": "Fantastique",
                "yearAsc": "Date (Plus récent)",
                "yearDesc": "Date (Plus vieux)",
                "titleAsc": "Nom (A-Z)",
                "titleDesc": "Nom (Z-A)",
                "ratingAsc": "Etoiles (Meilleur)",
                "ratingDesc": "Etoiles (Pire)",
                "allCategories": "Toutes catégories",
            };
        default:
            return {
                "settings": "Settings",
                "logout": "Logout",
                "search": "Search",
                "filterBy": "Filter by",
                "sortBy": "Sort by",
                "action": "Action",
                "adventure": "Adventure",
                "animation": "Animation",
                "comedy": "Comedy",
                "crime": "Crime",
                "documentary": "Documentary",
                "drama": "Drama",
                "family": "Family",
                "fantasy": "Fantasy",
                "yearAsc": "Date (Newer)",
                "yearDesc": "Date (Older)",
                "titleAsc": "Name (A-Z)",
                "titleDesc": "Name (Z-A)",
                "ratingAsc": "Stars (Best)",
                "ratingDesc": "Stars (Worst)",
                "allCategories": "All Categories",
            };
    }
}


export default internationalization;