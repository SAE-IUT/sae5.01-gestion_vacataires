Feature: Filtrage des vacataires
  En tant qu'administrateur
  Je souhaite filtrer la liste des vacataires
  Afin de visualiser les vacataires en fonction de leur module affecté

  Scenario: Filtrer les vacataires qui son affecté à un certain module
    Given Je me connect en tant qu'admin
    When Click du Bouton "Filtres"
    And Je choisis le module "DEV"
    Then La liste des vacataires devrait être filtrée pour afficher uniquement les vacataires affécter au module "DEV"
