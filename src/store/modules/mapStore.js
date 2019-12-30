let state = {
    mapGeomValue: '',
    mapGeomWkid: ''
};
let mutations = {
    setMapGeomValue(state, data){
        state.mapGeomValue = data;
    },
    setMapGeomWkid(state, wkid){
        state.mapGeomWkid = wkid;
    }
};
let actions = {

};

export default{
    state, mutations,actions
}