package com.cse416.server.geojson.precincts;

public class Properties {
    private String precinct;
    private Integer population;
    private Integer republican;
    private Integer democrat;
    private Integer white;
    private Integer black;
    private Integer hispanic;
    private Integer asian;
    private Integer pacific;
    private Integer indigenous;
    private Integer other;

    public String getPrecinct() {
        return precinct;
    }

    public void setPrecinct(String precinct) {
        this.precinct = precinct != null ? precinct : "NULL";
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

    public Integer getOther() {
        return other != null ? other : 0; // Default to 0 if null
    }

    public void setOther(Integer other) {
        this.other = other;
    }

	public Integer getIndigenous() {
		return indigenous;
	}

	public void setIndigenous(Integer indigenous) {
		this.indigenous = indigenous;
	}
}
