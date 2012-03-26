/*
This function allows one to update the URL hash without disrupting any other parameters.
 */

var Hash_retainer = function(options){
    var build_tab_hash = function(property, value, hash){
        if(typeof typeof hash !== 'undefined') {
            if(hash.substr(0,1) === '&'){
                hash = hash.substr(1, hash.length);
            }
            if(hash !== ''){
                hash = '#'+property + "=" + value + '&' + hash;
            }
            else {
                hash = '#'+property + "=" + value;
            }
            return hash;
        }
    }

    var prior_tab_hash = function(hash, value){
        var search = new RegExp("tab="+value, "g");
        hash = hash.replace(search, '');
        return hash;
    }

    this.set_hash = function(map){
        var url = $.url();
        var hash = window.location.hash;
        hash = hash.substr('1', hash.length); // remove the '#'

        $.each(map, function(property, value){
            var property_hash = url.fparam(property);

            if(hash === ''){
                hash = build_tab_hash(property, value);
            } else if(typeof property_hash !== 'undefined'){
                hash = prior_tab_hash(hash, property_hash);
                hash = build_tab_hash(property, value, hash);
            } else {
                hash = prior_tab_hash(hash, value);
                hash = build_tab_hash(property, value, hash);
            }
        });
        window.location.hash = hash;
    }
}