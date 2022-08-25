@Release20.0 @BUC7984
Feature: BUC7984 - US11764 View Changes for new Offer Description in project

    As an Offer Manager user with View Changes privilege
    I want to click on View Changes Description section
    So that I can see the changes mades on the new Offer's Description


@pending @nohookslogin
Scenario Outline: Verify the correct changes on new Offers for simple po
    Given I have '<state>' offer created by 'upadmin' with a description to see the changes
    And I login with 'anne' that has View Change privileges
    And I change the 'Description type' to 'label'
    And I change the 'Description' to 'My new description changes'
    And I change the 'Tags' to 'AUDIT'
    And I navigate to View Changes description section for my offer
    Then I should see correct 'Description type' with the Changed Values to 'anne'
    And I should see correct 'Description' with the Changed Values to 'anne'
    And I should see correct 'Tags' with the Changed Values to 'anne'

    Examples:
    | state      |
    | Active     |
    | Definition |


@pending @nohookslogin
Scenario Outline: Verify the correct changes on new Offers for simple po with translation
    Given I login with 'lisa' that has View Change privileges
    And I have '<state>' offer created by 'anne' with a translaton description to see the changes
    When I navigate to View Changes description section for my offer
    And I select the option to see the translation 'lisa'
    Then I should see the description translation 'lisa'

    Examples:
    | state      |
    | Active     |
    | Definition |

@pending @nohookslogin
Scenario Outline: Verify the correct changes on new Offers for a device po
    Given I login with 'alex' that has View Change privileges
    When I have '<state>' device created by 'lisa' offer with a description to see the changes
    And I change the 'Description type' to 'label'
    And I change the 'Description' to 'My new description changes'
    And I change the 'Tags' to 'AUDIT'
    And I navigate to View Changes description section for my offer
    Then I should see correct 'Description type' with the Changed Values to 'alex'
    And I should see correct 'Description' with the Changed Values to 'alex'
    And I should see correct 'Tags' with the Changed Values to 'alex'

    Examples:
    | state      |
    | Active     |
    | Definition |

@pending @nohookslogin
Scenario Outline: Verify the correct changes on new Offers for simple po copied
    Given I login with 'lisa' that has View Change privileges
    And I have '<state>' offer created by 'anne' with a translaton description to see the changes
    When I copy this offer to check the changes
    And I delete the description from the copied po
    And I navigate to View Changes description section for my offer
    Then I should not see the description translation 'lisa'

    Examples:
    | state      |
    | Active     |
    | Definition |