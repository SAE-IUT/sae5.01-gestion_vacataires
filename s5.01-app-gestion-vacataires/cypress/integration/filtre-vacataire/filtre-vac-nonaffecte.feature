Feature: Filtrage des vacataires
  En tant qu'administrateur
  Je souhaite filtrer la liste des vacataires
  Afin de visualiser les vacataires en fonction de leur affectation

  Scenario: Filtrer les vacataires qui son non affecté
    Given Je me connecte en tant qu'admini
    When Clique du bouton "Filtres"
    And Je choisis l'affectation " Non Affecté"
    Then La liste des vacataires devrait être filtrée pour afficher uniquement ceux qui ne son pas affecté
