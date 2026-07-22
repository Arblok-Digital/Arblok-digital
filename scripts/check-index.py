import sys
p = open('index.html', 'r', encoding='utf-8').read()
lines = p.split('\n')
for i, line in enumerate(lines):
    if 'head>' in line:
        print(f'Line {i+1}: {repr(line.strip())}')
    if '-->' in line:
        print(f'Line {i+1}: {repr(line.strip())}')
print('---')
print('DOCTYPE valid:', '!DOCTYPE html' in p)
print('Head closed:', '</head>' in p)
print('Body has root:', 'id="root"' in p)
print('Title:', p[p.find('<title>')+7:p.find('</title>')] if '<title>' in p else 'MISSING')
# Check for fake reviews
print('Has Doni:', 'Doni' in p)
print('Has AggregateRating:', 'AggregateRating' in p)
