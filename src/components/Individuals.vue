<template>
    <div>

        <div v-if="(individualsSelected)">
            <!-- year  -->
            <div class="row padding-top-only">
                <div class="col-md-1" ></div>
                <div class="col-md-10" >
                    <b-form-group class="padding-top-only"
                                  id="yearFilterSlider"
                                  v-if="openOverlay && individualsSelected"
                                  >
                        <vue-slider class="style-slider"
                                    v-model="filters.sliderVals.value"
                                    v-bind="filters.sliderVals"
                        />
                    </b-form-group>
                </div>
                <div class="col-md-1" ></div>
            </div>
            <div class="row grey-text center-item padding-top-neg" >Years</div>


            <!-- title and nationality-->
            <div class="row padding-top-only">
                <div class="col-md-1"></div>
                <div class="col-md-4">
                    <b-form-group
                            style="align-items: left"
                            id="titleFilter"
                            label-for="titleFilterBox">
                        <b-form-input
                                id="titleFilterBox"
                                size="sm"
                                type="text"
                                v-model="filters.searchTitles"
                                placeholder="">
                        </b-form-input>
                    </b-form-group>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4">
                    <b-form-group
                            id="nationalityFilter"
                            label-for="nationalityFilterBox">
                        <b-form-input
                                id="nationalityFilterBox"
                                size="sm"
                                type="text"
                                v-model="filters.searchNationality"
                                placeholder="">
                        </b-form-input>
                    </b-form-group>
                </div>
                <div class="col-md-1"></div>
            </div>
            <div class="row padding-neg">
                <div class="col-md-1"></div>
                <div class="col-md-4 grey-text" >Name</div>
                <div class="col-md-1"></div>
                <div class="col-md-4 grey-text">Nationality</div>
                <div class="col-md-1"></div>
            </div>

            <!-- gender and location-->
            <div class="row padding-top-only">
                <div class="col-md-1"></div>
                <div class="col-md-4">
                    <b-form-group
                            id="locFilter"
                            label-for="locFilterBox">
                        <b-form-input
                                id="locFilterBox"
                                size="sm"
                                type="text"
                                v-model="filters.searchLocation"
                                placeholder="name or type"

                        >
                        </b-form-input>
                    </b-form-group>
                </div>

                <div class="col-md-6 grey-text" style="margin-left:40px">
                    <b-form-radio-group id="btnRadios"
                                        sz="sm"
                                        button-variant="outline-secondary"
                                        v-model="filters.searchGender"
                                        :options="genderOptions"
                    ></b-form-radio-group>
                </div>
            </div>

            <div class="row padding-bottom-only">
                <div class="col-md-1"></div>
                <div class="col-md-4 grey-text">Location</div>
                <div class="col-md-1"></div>
                <div class="col-md-4 grey-text">Gender</div>
            </div>

            <div class="row padding-bottom-only center-item">
                <b-button size="small" variant="primary" v-on:click="submit(filters)">Submit</b-button>
            </div>

        </div>
    </div>
</template>

<script>
	import vueSlider from 'vue-slider-component';
    import EventBus from './eventBus'
    export default {
        name: 'Individuals',
        components: {
            vueSlider
        },
        data: () => ({
          filters:
            {
              sliderVals:
                {
                  min: 1500,
                  max: 1950,
                  value: [1500, 1950],
                  formatter: "{value}",
                  mergeFormatter: "{value1} ~ {value2}",
                  tooltip: "always",
                  enableCross: false,
                  bgStyle: {
                    "backgroundColor": "#fff",
                    "boxShadow": "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
                  },
                  tooltipStyle: {
                    "backgroundColor": "#0033FF",
                    "borderColor": "#0033FF"
                  },
                  processStyle: {
                    "backgroundColor": '#0033FF'
                  }
                },
              searchTitles: "",
              searchNationality: "",
              searchGender: "Both",
              searchLocation: "",
            },
          genderOptions: [
            {text: 'M', value: 'male'},
            {text: 'W', value: 'female'},
            {text: 'Both', value: 'Both'}
          ]
        }),
        props: [
          'individualsSelected',
          'openOverlay'
        ],
        methods: {
          submit(filters){

            // if 'true', user selected the filter attribute
            let attributesSelected = {
                "years": true,
                "nationality": false,
                "title": false,
                "gender": false,
                "location": false
            };

            if (filters.searchNationality !== ""){
              attributesSelected.nationality = true;
            }
            if (filters.searchTitles !== ""){
              attributesSelected.title = true;
            }
            if (filters.searchGender !== "Both"){
              attributesSelected.gender = true;
            }
            if (filters.searchLocation !== ""){
              attributesSelected.location = true;
            }

            let filterResults = {
              filters: filters,
              userSelections: attributesSelected,
              clear:true};

            this.$emit('filterIndividual', filterResults);
          },
          resetFilters(){
            this.filters.sliderVals.values = [1600, 1930];
            this.filters.searchNationality= "";
            this.filters.searchTitles= "";
            this.filters.searchGender= "Both";
            this.filters.searchLocation= "";
          }
        },
        created() {

            EventBus.$on('showAllMarkers', () => {

              let attributesSelected = {
                "years": true,
                "nationality": false,
                "title": false,
                "gender": false,
                "location": false
              };

              let filterResults = {
                filters: this.filters,
                userSelections: attributesSelected,
                clear:false};

              this.$emit('filterIndividual', filterResults);
            });
      }

    };
</script>

<style>

    @import "../../node_modules/leaflet/dist/leaflet.css";

    .center-item {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .grey-text {
        color: #101010;
        text-align: left;
    }

    .padding-neg {
        padding-top: -20px;
        padding-bottom: -20px;
    }

    .padding-top-neg {
        padding-top: -20px;
    }

    .padding-top-only {
        padding-top: 20px;
    }
    .padding-bottom-only {
        padding-bottom: 10px;
    }


</style>
