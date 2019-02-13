import React from 'react';

import AppComponent from 'flow-app-component';

import './css/theme/default.css';

class SearchComponent extends AppComponent {
  constructor() {
    super();
    const newState = {
        interactiveMode: false,
        readOnly: false,
        properties: [
        {
          categoryName: 'General',
          categoryDescription: 'Basic settings for the search',
          properties: [],
        },
        {
          categoryName: 'Events',
          categoryDescription: 'Events for the search',
          properties: [
            {
              id: 'event',
              name: 'Events',
              type: 'graph',
              options: {},
              data: null,
            },
          ],
        },
      ],
      iconUrl: '/assets/images/search-component.png',
      name: 'Search',
      type: 'ui-component',
      componentType: 'search',
      category: 'Inputs',
      parent: null,
      showOnComponentsPanel: true,
      isValuable: true,
      allowsChildren: false,
    };

    this.state = Object.assign(this.state, newState); // merge two states together, and dont lose any parent state properties.
  }

  componentDidMount(){
    const interactiveMode = !(this.props.propertyData.interactiveMode === undefined);
    this.setState({interactiveMode, readOnly: interactiveMode});
  }

  handleDbClick = (e) => {
    e.preventDefault();
    if(this.state.interactiveMode){
        this.setState(prevState => ({readOnly: !prevState.readOnly}))
    }
  }

  triggerGraphEvent = () => {
    const graphId = this.getPropertyData('event');
    this.getElementProps().onEvent(graphId)
  }

  renderContent() {
    return (
      <div 
        className="search-container"
        onMouseOver={this.triggerGraphEvent}
      >
        <div className="search-inner-container">
          <div className="search-innermost-container">
            <div className="search-form-wrapper">
              <form method="get">
                <div dir="ltr">
                  <div className="search-component-wrapper">
                    <label htmlFor="search-component" className="search-label">
                      <span className="search-text">Search</span>
                      <div className="search-icon">
                        <svg
                          viewBox="0 0 16 16"
                          role="presentation"
                          aria-hidden="true"
                          focusable="false"
                          style={{
                            height: '18px',
                            width: '18px',
                            display: 'block',
                            fill: 'currentcolor',
                          }}
                        >
                          <path d="m2.5 7c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5m13.1 6.9-2.8-2.9c.7-1.1 1.2-2.5 1.2-4 0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7c1.5 0 2.9-.5 4-1.2l2.9 2.8c.2.3.5.4.9.4.3 0 .6-.1.8-.4.5-.5.5-1.2 0-1.7" />
                        </svg>
                      </div>
                      <div className="search-input">
                        <div className="search-input-wrapper">
                          <input
                            type="text"
                            className="search-input-component"
                            aria-autocomplete="list"
                            aria-describedby="search-component-description"
                            aria-expanded="false"
                            aria-controls="search"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            id="search-component"
                            onMouseOver={this.triggerGraphEvent}
                            onKeyUp={this.triggerGraphEvent}
                            onKeyDown={this.triggerGraphEvent}
                            name="query"
                            placeholder="Try “Toronto”"
                            role="combobox"
                            readOnly={this.state.readOnly}
                            onDoubleClick={this.handleDbClick}
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchComponent;
