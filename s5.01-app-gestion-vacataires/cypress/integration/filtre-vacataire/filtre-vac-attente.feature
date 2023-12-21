Feature: Filtrage des vacataires
  En tant qu'administrateur
  Je souhaite filtrer la liste des vacataires
  Afin de visualiser les vacataires en fonction de leur affectation

  Scenario: Filtrer les vacataires qui son en attente
    Given Je me connecte en tant qu'Admin
    When Clique Du bouton "Filtres"
    And Je choisis l'affectation " En Attente"
    Then La liste des vacataires devrait être filtrée pour afficher uniquement ceux qui ne son en attente
