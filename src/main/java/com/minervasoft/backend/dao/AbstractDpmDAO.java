package com.minervasoft.backend.dao;

import java.util.List;
import java.util.Map;

public class AbstractDpmDAO extends AbstractDAO {

    private final static String DEFAULT_DB_TYPE = "db2";
    
    private static String DB_TYPE = null;
    
    private String getPrefixQueryId() {
        String prefix = DB_TYPE;
        if (prefix == null) {
            prefix = System.getProperties().getProperty("DBType");
            
            if (prefix == null
                    || prefix.isEmpty()) {
                prefix = DEFAULT_DB_TYPE;
            }
            
            DB_TYPE = prefix;
        }
        
        return prefix;
    }

    @Override
    public Object insert(String queryId) {
        // TODO Auto-generated method stub
        String prefix = this.getPrefixQueryId();
        return super.insert(prefix + "." + queryId);
    }

    @Override
    public Object insert(String queryId, Object parameterObject) {
        // TODO Auto-generated method stub
        String prefix = this.getPrefixQueryId();
        return super.insert(prefix + "." + queryId, parameterObject);
    }

    @Override
    public int update(String queryId) {
        // TODO Auto-generated method stub
        String prefix = this.getPrefixQueryId();
        return super.update(prefix + "." + queryId);
    }

    @Override
    public int update(String queryId, Object parameterObject) {
        // TODO Auto-generated method stub
        String prefix = this.getPrefixQueryId();
        return super.update(prefix + "." + queryId, parameterObject);
    }

    @Override
    public int delete(String queryId) {
        // TODO Auto-generated method stub
        String prefix = this.getPrefixQueryId();
        return super.delete(prefix + "." + queryId);
    }

    @Override
    public int delete(String queryId, Object parameterObject) {
        // TODO Auto-generated method stub
        String prefix = this.getPrefixQueryId();
        return super.delete(prefix + "." + queryId, parameterObject);
    }

    @Override
    public Object selectOne(String queryId) {
        // TODO Auto-generated method stub
        String prefix = this.getPrefixQueryId();
        return super.selectOne(prefix + "." + queryId);
    }

    @Override
    public Object selectOne(String queryId, Object parameterObject) {
        // TODO Auto-generated method stub
        String prefix = this.getPrefixQueryId();
        return super.selectOne(prefix + "." + queryId, parameterObject);
    }

    @Override
    public List<?> selectList(String queryId) {
        // TODO Auto-generated method stub
        String prefix = this.getPrefixQueryId();
        return super.selectList(prefix + "." + queryId);
    }

    @Override
    public List<?> selectList(String queryId, Object parameterObject) {
        // TODO Auto-generated method stub
        String prefix = this.getPrefixQueryId();
        return super.selectList(prefix + "." + queryId, parameterObject);
    }

    @Override
    public Map<?, ?> selectMap(String queryId, Object parameterObject, String keyProperty) {
        // TODO Auto-generated method stub
        String prefix = this.getPrefixQueryId();
        return super.selectMap(prefix + "." + queryId, parameterObject, keyProperty);
    }
}
