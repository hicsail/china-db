export const PopupContent = {
  methods: {
    getPopupContent(data){
      let type = data.type;
      if (type === 'person') {
        return this.getPopupIndividual(data)
      }

      //TODO popup content for other types besides 'person'
      return 'TODO';
    },
    getPopupIndividual(data){
      /*
       * @param  data  DB entry for one individual
       * @return       an HTML string to use as popup content
       */

      let lastName = this.capitalize(data.titles.family_name_en);
      let firstName = this.capitalize(data.titles.given_name_en);
      let lastNamePy = this.capitalize(data.titles.family_name_py);
      let firstNamePy = this.capitalize(data.titles.given_name_py);
      let sex = this.capitalize(data.gender);
      let origin = this.capitalize(data.nationality);
      let location = this.capitalize(data.loc.location_name);


      let start = '<div><table><tbody>';
      let name =  '<tr><td>' + lastName + ', ' + firstName + '</td></tr>';
      let name_py = '<tr><td>' + lastNamePy + ', ' + firstNamePy + '</td></tr>';
      let gender = '<tr><td>' + sex + '</td></tr>';
      let nationality = '<tr><td>' + origin + '</td></tr>';
      let loc = '<tr><td>' + location + '</td></tr>';
      let time = '<tr><td>' + data.time.birth_year + '-' + data.time.death_year + '</td></tr>';
      let end = '</tbody></table> </div>';

      let popupContent = start + name + name_py + gender + nationality + loc + time + end;
      popupContent = popupContent.replace(/, N\/A/g, '').replace(/N\/A-N\/A/g, '').replace(/N\/A/g, '');
      return popupContent;
    },
    capitalize(string){
      let capitalized = "";
      let words = string.split(" ");

      // capitalize each word in string (eg, "nettie m" => "Nettie M"),
      for (let i = 0; i < words.length; i++){
        capitalized += words[i].charAt(0).toUpperCase() + words[i].slice(1);
        if (i < words.length - 1){
          capitalized += " ";
        }
      }

      return capitalized;
    }
  }
}


