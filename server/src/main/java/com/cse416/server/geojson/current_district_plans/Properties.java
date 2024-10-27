package com.cse416.server.geojson.current_district_plans;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Properties {
	private Integer district;
	private String incumbent;
    private String representative;
    private Integer population;
    private Integer republican;
    private Integer democrat;
    private Integer white;
    private Integer black;
    private Integer hispanic;
    private Integer asian;
    private Integer pacific;
    @JsonProperty("native")
    private Integer nativePopulation;
    private Integer other;
    
    public Integer getDistrict() {
    	return district != null ? district : 0;
    }
    
    public void setDistrict(Integer district) {
    	this.district = district;
    }
    
    public String getIncumbent() {
        return incumbent;
    }
    
    public void setIncumbent(String incumbent) {
        this.incumbent = incumbent != null ? incumbent : "NULL";
    }

    public String getRepresentative() {
        return representative;
    }

    public void setRepresentative(String representative) {
        this.representative = representative != null ? representative : "NULL";
    }

    public Integer getPopulation() {
        return population != null ? population : 0; // Default to 0 if null
    }

    public void setPopulation(Integer population) {
        this.population = population;
    }

    public Integer getRepublican() {
        return republican != null ? republican : 0; // Default to 0 if null
    }

    public void setRepublican(Integer republican) {
        this.republican = republican;
    }

    public Integer getDemocrat() {
        return democrat != null ? democrat : 0; // Default to 0 if null
    }

    public void setDemocrat(Integer democrat) {
        this.democrat = democrat;
    }

    public Integer getWhite() {
        return white != null ? white : 0; // Default to 0 if null
    }

    public void setWhite(Integer white) {
        this.white = white;
    }

    public Integer getBlack() {
        return black != null ? black : 0; // Default to 0 if null
    }

    public void setBlack(Integer black) {
        this.black = black;
    }

    public Integer getHispanic() {
        return hispanic != null ? hispanic : 0; // Default to 0 if null
    }

    public void setHispanic(Integer hispanic) {
        this.hispanic = hispanic;
    }

    public Integer getAsian() {
        return asian != null ? asian : 0; // Default to 0 if null
    }

    public void setAsian(Integer asian) {
        this.asian = asian;
    }

    public Integer getPacific() {
        return pacific != null ? pacific : 0; // Default to 0 if null
    }

    public void setPacific(Integer pacific) {
        this.pacific = pacific;
    }

    public Integer getNativePopulation() {
        return nativePopulation != null ? nativePopulation : 0; // Default to 0 if null
    }

    public void setNativePopulation(Integer nativePopulation) {
        this.nativePopulation = nativePopulation;
    }

    public Integer getOther() {
        return other != null ? other : 0; // Default to 0 if null
    }

    public void setOther(Integer other) {
        this.other = other;
    }
}
