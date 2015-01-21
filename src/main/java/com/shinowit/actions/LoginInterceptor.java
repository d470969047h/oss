package com.shinowit.actions;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

import java.util.Map;

/**
 * Created by daihui on 2014-11-19.
 */
public class LoginInterceptor extends AbstractInterceptor {
        @Override
        public String intercept(ActionInvocation Invocation) throws Exception {
            Map<String,Object> session=Invocation.getInvocationContext().getSession();
            if(session.containsKey("operSession")==false){
                return "failed";
            }else{
                return Invocation.invoke();
            }
        }
}
