import React from 'react';

export default (loader, collection) => (
    class AsyncComponent extends React.Component {
      constructor(props) {
        super(props);

        this.Component = null;
        this.state = { Component: AsyncComponent.Component };
      }

      componentWillMount() {
        if (!this.state.Component) {
          console.log("asyncComponent:componentWillMount()...");
          console.log("loader == " + loader);
          console.log("collection == " + JSON.stringify(collection));
          loader().then((Component) => {
            AsyncComponent.Component = Component.default;

            this.setState({ Component });
          });
        }
      }

      render() {
        if (this.state.Component) {
          return <this.state.Component { ...this.props } { ...collection } />;
        }

        return null;
      }
    }
);