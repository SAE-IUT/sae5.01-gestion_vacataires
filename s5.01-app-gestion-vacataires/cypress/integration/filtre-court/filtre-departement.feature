Feature: Filtrage par département
  En tant qu'administrateur
  Je souhaite filtrer la liste des modules
  Afin de visualiser les modules en fonction de leur département

  Scenario: Filtrer les modules par département
    Given Je suis connecté en tant qu'administrateur
    When Je clique sur le bouton "Filtre"
    And Je choisis le département "INFO"
    Then La liste des modules devrait être filtrée pour afficher uniquement les modules d'INFO
