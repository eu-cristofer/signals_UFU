import numpy as np 
import scipy.stats as st 
x = np.random.uniform(3,6,size=12) 
xb = np.mean(x) 
s = np.std(x) 
z = st.t.ppf(.975,11) 
IC = [xb-z*s/np.sqrt(12), xb+z*s/np.sqrt(12)]
b = np.zeros(1000) 
for i in range(1000): 
    index =np.random.choice(12,12, replace=True)
    b[i] = np.mean(x[index])
ICb = np.quantile(b,[.025,.975])   
i = 1 