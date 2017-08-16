let TableData = React.createClass({
  render: function() {
    return (
      <p> {this.props.data} < /p>
    );
  }
});

let TableTitle = React.createClass({
  render: function(){
    return(
    <div>
    <h2>{this.props.title}</h2>
      </div>
    );
  }
});

let SearchMatch = React.createClass({
  render: function(){
    return(
      <div>
      <p>Match: {this.props.match}</p>
      </div>
    );
  }
});

let Table = React.createClass({
  render: function(){
    let rowsTitle =[];
    let search = [];
    let searchTerm = this.props.searchTerm;
    let key = '';
    this.props.data.forEach(function(row){
      if(row.title.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1 &&
        row.tags.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1)
        return;
      if(row.title.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1){
        let m = row.tags.toLowerCase().split(' ');
        for(let i in m){
          if(m[i].indexOf(searchTerm.toLowerCase()) !== -1 )
            key = m[i];
        }
      } else {
        key = row.title.toLowerCase();
      }

      rowsTitle.push(<TableTitle title ={row.title} />);
      if(searchTerm != '')
       rowsTitle.push(<SearchMatch match ={key} />);
      rowsTitle.push(<TableData data={row.content} />);

    });

      return(
      <div>
          {rowsTitle}
      </div>
      );

  }
});

let Search = React.createClass({
  filterList: function(event){
    this.props.userInput(event.target.value);
  },

  render: function(){
    return (
    <input type="text"
      placeholder="start typing"
      value={this.props.searchTerm} onChange={this.filterList} autoFocus />
    );
  }
});


let App = React.createClass({
  getInitialState: function(){
    return{
      filterText:''
    };
  },
  handleUserInput: function(filter){
   this.setState({
     filterText:filter
   });
  },
  render: function(){
    return (
    <div>
      <Search searchTerm={this.state.filterText} userInput ={this.handleUserInput} />
      <Table searchTerm={this.state.filterText} data={this.props.data}/>
    </div>
    );
  }
});


let DATA = [{
  "title": "Binding",
  "tags": "Binding Hiding Miding Sliding SAVE",
  "content": "This is the binding content area where information about binding is shown"
}, {
  "title": "Constant",
  "tags": "Math bath slather calf save",
  "content": "This is the Constant content area where information about Constant is shown"
}, {
  "title": "Numbers",
  "tags": "Happy birthday sir and maam",
  "content": "This is the Numbers content area where information about Numbers is shown"
}];

React.render(<App data={DATA} />, document.getElementById("app"));
