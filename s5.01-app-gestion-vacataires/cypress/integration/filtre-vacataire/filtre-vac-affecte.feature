Feature: Filtrage des vacataires
  En tant qu'administrateur
  Je souhaite filtrer la liste des vacataires
  Afin de visualiser les vacataires en fonction de leur affectation

  Scenario: Filtrer les vacataires qui son affecté
    Given Je me connecte en tant qu'admin
    When Click du bouton "Filtres"
    And Je choisis l'affectation "Affecté"
    Then La liste des vacataires devrait être filtrée pour afficher uniquement les affecté à un module
