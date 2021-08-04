import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pictures: [],
        input: 'flower',
      }
      this.handleSearch = this.handleSearch.bind(this);
      this.updateInput = this.updateInput.bind(this);
    }

    componentDidMount() {
      this.loadPics();
    }

    loadPics() {
      /*fetch('https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=e682e046fa5968ade7ac0b42e5e2e95f&gallery_id=72157718793456406&extras=owner_name,description,tags&format=json&nojsoncallback=1&safe_search=1')*/
      fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e682e046fa5968ade7ac0b42e5e2e95f&text=' + this.state.input + '&extras=owner_name,description,tags&format=json&nojsoncallback=1&safe_search=1')
      .then(function(response){return response.json();})
      .then(function(data){
        let picArray = data.photos.photo.map((pic) => {
          var srcPath = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
          var ownerPath = 'https://www.flickr.com/photos/' + pic.owner + '/';
          var titlePath = ownerPath + pic.id + '/';
          return (
            <div>
              <div class="image">
                <img src={srcPath} />
              </div>
              <div class="details">
                <div class="title">
                  <a href={titlePath}>{pic.title}</a>
                </div>
                <div class="owner">
                  by <a href={ownerPath}>{pic.ownername}</a>
                </div>
                <div class="desc">
                  Description: {pic.description._content}
                </div>
                <div class="tags">
                  Tags: {pic.tags}
                </div>
              </div>
            </div>
          )
        })
        this.setState({pictures: picArray});
      }.bind(this))
    }

    updateInput(e) {
      this.setState({input: e.target.value});
    }

    handleSearch(txt) {
      this.loadPics();
    }

    render() {
      return (
        <div id="wrapper">
		      <h1>Kate Arnold's Flickr Photo Stream</h1>
          <div id="searchwrapper">
            <input value={this.state.input} onChange={this.updateInput} placeholder="Search..." />
            <button onClick={this.handleSearch}>Go</button>
          </div>
          <div id="flickr">
            {this.state.pictures}
          </div>
        </div>
      )
    }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
