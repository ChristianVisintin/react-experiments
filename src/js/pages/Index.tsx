/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React, { Component } from "react";
import { IntlProvider } from 'react-intl';
import { getCookies, setLanguage } from "../actions/cookiesActions";
import { Action } from 'redux';
import { ThunkDispatch  } from 'redux-thunk';
import PropTypes from "prop-types";
//Router
import { BrowserRouter as Router, Route } from "react-router-dom";
//Redux
import { connect } from "react-redux";

//Components
import Waiting from "../components/Waiting";
//Pages
const Home = React.lazy(() => import("./Home"));
//Classes
import CookieStorage from "../classes/cookieStorage";
import { StoreState } from "../reducers/types";
import Translations from "../classes/translations";
import { getNavigatorLanguage } from "../utils";

export interface IndexProps {
  translations: Translations,
  cookies?: CookieStorage,
  setLanguage?: Function,
  getCookies?: Function
};

class Index extends Component<IndexProps, {}> {

  static propTypes = {
    getCookies: PropTypes.func.isRequired,
    cookies: PropTypes.object.isRequired,
    setLanguage: PropTypes.func.isRequired,
    translations: PropTypes.object.isRequired
  };

  constructor(props: IndexProps) {
    super(props);
  }

  getWebLanguage() {
    const lang = this.props.cookies ? this.props.cookies.lang : "en";
    if (lang in this.props.translations) {
      return lang;
    } else {
      let language: string = getNavigatorLanguage();
      if (!(language in this.props.translations)) {
        //Set fallback language
        language = 'en';
      }
      //Try to set cookie, if policy hasn't been accepted it won't be set
      if (this.props.setLanguage) {
        this.props.setLanguage(language);
      }
      return language;
    }
  }

  render() {
    const messages = this.props.translations[this.getWebLanguage()] ? this.props.translations[this.getWebLanguage()] : this.props.translations.en;
    return (
      <IntlProvider locale={this.getWebLanguage()} messages={messages}>
        <Router>
          <div className="App">
            <React.Suspense fallback={<Waiting />}>
              <Route exact path="/" component={Home} />
            </React.Suspense>
          </div>
        </Router>
      </IntlProvider>
    )
  }
}

interface MapStateToPropsTypes {
  cookies: StoreState,
  translations: object
};

const mapStateToProps = (state: MapStateToPropsTypes) => ({
  cookies: state.cookies.items,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, void, Action>) => ({
  getCookies: () => dispatch(getCookies()),
  setLanguage: (lang: string) => dispatch(setLanguage(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)<any>(Index);
