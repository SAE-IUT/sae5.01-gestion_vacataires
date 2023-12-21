Feature: Filtrage des modules
  En tant qu'administrateur
  Je souhaite filtrer la liste des modules
  Afin de visualiser les modules en fonction de différents critères

  Scenario: Filtrer les modules par matière
    Given Je me connecte en tant qu'administrateur
    When Click sur le bouton "Filtre"
    And Je choisis la matière "math"
    Then La liste des modules devrait être filtrée pour afficher uniquement les modules de la catégorie "math"
