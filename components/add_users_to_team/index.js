// Copyright (c) 2017 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProfilesNotInTeam, searchProfiles} from 'mattermost-redux/actions/users';
import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';
import {searchProfilesNotInCurrentTeam, getProfilesNotInCurrentTeam} from 'mattermost-redux/selectors/entities/users';

import {addUsersToTeam} from 'actions/team_actions.jsx';
import {setAddUsersToTeamSearchTerm} from 'actions/search.js';

import AddUsersToTeam from './add_users_to_team.jsx';

function mapStateToProps(state) {
    const searchTerm = state.views.search.addUsersToTeam;

    let users;
    if (searchTerm) {
        users = searchProfilesNotInCurrentTeam(state, searchTerm, true);
    } else {
        users = getProfilesNotInCurrentTeam(state);
    }

    const team = getCurrentTeam(state) || {};

    return {
        currentTeamName: team.display_name,
        currentTeamId: team.id,
        searchTerm,
        users,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getProfilesNotInTeam,
            setAddUsersToTeamSearchTerm,
            searchProfiles,
            addUsersToTeam,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersToTeam);
