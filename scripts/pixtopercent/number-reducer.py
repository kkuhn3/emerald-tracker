import re

with open('./output.txt', 'w') as out:
	with open('../cities.css') as f:
		for line in f:
			numMatch = re.search('[0-9]+px', line)
			if (numMatch == None):
				out.write(line)
			else:
				num = int(numMatch.group()[0:-2]) - 4
				topMatch = re.search('top', line)
				if (topMatch == None):
					out.write('\tleft: ' + str(num) + 'px;\n')
				else:
					out.write('\ttop: ' + str(num) + 'px;\n')

