@Release20.0 @BUC7984
Feature: BUC7984 - US11730 View Changes for new Offer in Overview details in Project

  As a
    CSR user with View Changes privilege
  I want to
    click on View Changes
  so that I can
    view changes for offer overview

@pending
Scenario Outline: Verify correct initial overview values for new offer on view changes page
    Given I login with a user that has View Change privileges
    And I have '<offertype>' offer in '<state>' state
    When I navigate to View Changes page for my offer
    And I expand 'Overview' section in View Changes page
    Then I should see initial 'Name' under Changed Values
    And I should see initial 'Description' under Changed Values
    And I should see initial 'Version' under Changed Values
    And I should see initial 'State' under Changed Values
    And I should see initial 'Sell Indicator' under Changed Values

    Examples:
    | offertype | state      |
    | plan      | Active     |
    | bundle    | Definition |
    | device    | Active     |
    | copied    | Definition |

@pending
Scenario Outline: Verify correct changed overview values for new definition offer on view changes page
    Given I login with a user that has View Change privileges
    And I have '<offertype>' offer in 'Definition' state
    When I change the name of my offer
    And I change the description of my offer
    And I change the sell indicator of my offer
    And I navigate to View Changes page for my offer
    And I expand 'Overview' section in View Changes page
    Then I should see changed 'Name' value under Changed Values
    And I should see changed 'Description' value under Changed Values
    And I should see initial 'Version' value under Changed Values
    And I should see initial 'State' value under Changed Values
    And I should see changed 'Sell Indicator' value under Changed Values
    And I should see current user as value for Edited by for 'Name' under Changed Values
    And I should see current user as value for Edited by for 'Description' under Changed Values
    And I should see current user as value for Edited by for 'Sell Indicator' under Changed Values

    Examples:
    | offertype |
    | plan      |
    | bundle    |
    | device    |
    | copied    |

@pending
Scenario Outline: Verify correct initial edited by values in overview section for new offer on view changes page
    Given I login with a user that has View Change privileges
    And I have '<offertype>' offer in '<state>' state
    When I navigate to View Changes page for my offer
    And I expand 'Overview' section in View Changes page
    Then I should see initial Edited by value for 'Name' field under Changed Values
    And I should see initial Edited by value for 'Description' field under Changed Values
    And I should see initial Edited by value for 'Version' field under Changed Values
    And I should see initial Edited by value for 'State' field under Changed Values
    And I should see initial Edited by value for 'Sell Indicator' field under Changed Values

    Examples:
    | offertype | state      |
    | plan      | Active     |
    | bundle    | Definition |
    | device    | Active     |
    | copied    | Definition |

@pending
Scenario Outline: Verify View Changes of Overview show empty Existing Values for New Offer
    Given I login with a user that has View Change privileges
    And I have '<offertype>' offer in '<state>' state with no previous version
    When I navigate to View Changes page for my offer
    And I expand 'Overview' section in View Changes page
    Then I should see Existing Values section being empty
    And I should see message 'No Configuration' in Existing Values section

    Examples:
    | offertype | state      |
    | plan      | Active     |
    | bundle    | Definition |
    | device    | Active     |
    | copied    | Definition |

@pending
Scenario Outline: Verify translations for Overview section of View Changes page
    Given I login with a user that has View Change privileges
    And I have '<offertype>' offer in '<state>' state with overview translations
    When I navigate to View Changes page for my offer
    And I expand 'Overview' section in View Changes page
    And I set translation toggle to "Show Translation"
    Then I should see translated 'Name' value under Changed Values
    And I should see translated 'Description' value under Changed Values

    Examples:
    | offertype | state      |
    | plan      | Active     |
    | bundle    | Definition |
    | device    | Active     |
    | copied    | Definition |
