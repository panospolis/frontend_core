import React, {Component} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import ActorsList from "../components/sections/phaseOne/actorsList";
import ActorQuestionnaire from "../components/sections/phaseTwo/actorQuestionnaire";
import BaseQuestions from "../components/sections/phaseOne/baseQuestions";
import Sage from "../components/sections/sage";
import CreateSage from "../components/forms/sections/createSage";
import FacilitatorQuestionnaire from "../components/sections/phaseOne/facilitatorQuestionnaire";
import Progress from '../components/progress/progress'
import Settings from "../components/sections/settings";
import ErrorBoundary from "../components/errors/errorBoundary";
import SiteProfile from "../components/sections/phaseOne/siteProfile";
import BaseSection from "../components/sections/phaseOne/baseSection";
import SiteProfilePartTwo from "../components/sections/phaseTwo/siteProfilePartTwo";
import Scores from "../components/sections/phaseTwo/analysis/scores";
import Charts from "../components/sections/phaseTwo/analysis/charts";
import EvidenceActions from "../components/sections/phaseTwo/analysis/evidenceActions";
import SynthesisWorkshop from "../components/sections/phaseTwo/synthesisWorkshop";
import Assessment from "../components/sections/phaseTwo/analysis/assessment";
import AssessmentReport from "../components/sections/phaseTwo/analysis/assessment/assessmentReport";


export default class Routes extends Component {
    render() {
        return <Switch>
            <Route exact path="/sage/:id/actors">
                <ErrorBoundary>
                    <Progress step={1}>
                        <ActorsList/>
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route path="/sage/:id/site/profile/1/">
                <ErrorBoundary>
                    <Progress step={2}>
                        <SiteProfile/>
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/:id/sections">
                <ErrorBoundary>
                    <Progress step={3}>
                        <BaseSection/>
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/:id/two/site/profile/2/">
                <ErrorBoundary>
                    <Progress step={6}>
                        <SiteProfilePartTwo/>
                    </Progress>
                </ErrorBoundary>
            </Route>

            <Route exact path="/sage/:id/base-questions">
                <ErrorBoundary>
                    <Progress step={4}>
                        <BaseQuestions/>
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/:id/facilitator-questions">
                <ErrorBoundary>
                    <Progress step={5}>
                        <FacilitatorQuestionnaire/>
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/:id/two/actor/questions/:actor">
                <ErrorBoundary>
                    <Progress step={6}>
                        <ActorQuestionnaire/>
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/:id/two/actor/questions/">
                <ErrorBoundary>
                    <Progress step={6}>
                        <ActorQuestionnaire/>
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/:id/two/synthesis-workshop/:actor">
                <ErrorBoundary>
                    <Progress step={7}>
                        <SynthesisWorkshop/>
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/:id/two/synthesis-workshop">
                <ErrorBoundary>
                    <Progress step={7}>
                        <SynthesisWorkshop/>
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/create">
                <ErrorBoundary>
                    <CreateSage/>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/:id/two/analysis/scores">
                <ErrorBoundary>
                    <Progress step={9}>
                        <Scores/>
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/:id/two/analysis/charts">
                <ErrorBoundary>
                    <Progress step={10}>
                        <Charts/>
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/:id/two/assessments/fields">
                <ErrorBoundary>
                    <Progress step={11}>
                        <Assessment/>
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/:id/assessment/report">
                <ErrorBoundary>
                    <Progress step={12}>
                        <AssessmentReport />
                    </Progress>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage/setti  ngs">
                <ErrorBoundary>
                    <Settings/>
                </ErrorBoundary>
            </Route>
            <Route exact path="/sage">
                <ErrorBoundary>
                    <Sage/>
                </ErrorBoundary>
            </Route>
            <Route exact path="/">
                <ErrorBoundary>
                    <Sage/>
                </ErrorBoundary>
            </Route>

        </Switch>
    }
}